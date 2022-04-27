const db = require("../config/db");

const createUser = (body) => {
    return new Promise((resolve, reject) => {
        const { email_address, delivery_address, mobile_number, display_name, first_name, last_name, birth_date } = body;
        const sqlQuery =
            "INSERT INTO users(email_address, delivery_address, mobile_number, display_name, first_name, last_name, birth_date) VALUES ($1, $2, $3, $4, $5, $6, $7);";
        db.query(sqlQuery, [email_address, delivery_address, mobile_number, display_name, first_name, last_name, birth_date])
            .then(result => {
                const response = {
                    data: result.body,
                };
                resolve(response);
            })
            .catch((err) => reject({ status: 500, err }));
    });
};
const listAllUser = () => {
    return new Promise((resolve, reject) => {
        db.query("SELECT * FROM users")
            .then((result) => {
                const response = {
                    total: result.rowCount,
                    data: result.rows,
                };
                resolve(response);
            })
            .catch((err) => {
                reject({ status: 500, err });
            });
    });
};

const updateUser = (id, body) => {
    return new Promise((resolve, reject) => {
        const { email_address, delivery_address, mobile_number, display_name, first_name, last_name, birth_date } = body;
        const sqlQuery =
            "UPDATE users SET email_address=$1, delivery_address=$2, mobile_number=$3, display_name=$4, first_name=$5, last_name=$6, birth_date=$7 WHERE id = $8";
        db.query(sqlQuery, [email_address, delivery_address, mobile_number, display_name, first_name, last_name, birth_date, id])
            .then(({ rows }) => {
                const response = {
                    data: rows[0],
                };
                resolve(response);
            })
            .catch((err) => reject({ status: 500, err }));
    });
};
module.exports = {
    createUser,
    listAllUser,
    updateUser
};