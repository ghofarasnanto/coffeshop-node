const { v4: uuidV4 } = require("uuid");
const db = require("../config/db");

const register = (email, mobilenumber, hashedPassword) => {
    return new Promise((resolve, reject) => {
        const sqlQuery = "INSERT INTO users (id, email_address, mobile_number, password, created_at) VALUES ($1, $2, $3, $4, $5)";
        const id = uuidV4();
        const timestamp = new Date(Date.now());
        const values = [id, email, mobilenumber, hashedPassword, timestamp];
        db.query(sqlQuery, values)
            .then(() => {
                resolve();
            })
            .catch((err) => {
                reject({ status: 500, err });
            });
    });
};

const getUserByEmail = (email) => {
    return new Promise((resolve, reject) => {
        const sqlQuery = "SELECT email_address FROM users WHERE email_address = $1";
        db.query(sqlQuery, [email])
            .then((result) => {
                resolve(result);
            })
            .catch((err) => {
                reject({ status: 500, err });
            });
    });
};

const getPassByUserEmail = async(email) => {
    try {
        const sqlQuery = "SELECT id, password FROM users WHERE email_address = $1";
        const result = await db.query(sqlQuery, [email]);
        // cek apakah ada pass
        if (result.rowCount === 0)
            throw { status: 500, err: { msg: "Input Required" } };
        return result.rows[0];
    } catch (error) {
        const { status, err } = error;
        throw { status, err };
    }
};

module.exports = { register, getUserByEmail, getPassByUserEmail };