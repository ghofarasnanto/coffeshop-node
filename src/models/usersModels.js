const db = require("../config/db");

const createUser = (body) => {
    return new Promise((resolve, reject) => {
        const { email_address, delivery_address, mobile_number, display_name, first_name, last_name, birth_date } = body;
        const sqlQuery =
            "INSERT INTO users(email_address, delivery_address, mobile_number, username, first_name, last_name, birth_date) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *;";
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

const getSingleUser = (id) => {
    return new Promise((resolve, reject) => {
        // parameterized query
        const sqlQuery = "select * from users where id = $1";
        db.query(sqlQuery, [id])
            .then((data) => {
                if (data.rows.length === 0) {
                    return reject({ status: 404, err: "User Not Found" });
                }
                const response = {
                    data: data.rows[0],
                };
                resolve(response);
            })
            .catch((err) => {
                reject({ status: 500, err });
            });
    });
};


const updateUser = (id, body, image) => {
    return new Promise((resolve, reject) => {
        const { email_address, delivery_address, mobile_number, username, first_name, last_name, birth_date } = body;
        const sqlQuery =
            "UPDATE users SET email_address=COALESCE($1, email_address), delivery_address=COALESCE($2, delivery_address), mobile_number=COALESCE($3, mobile_number), username=COALESCE($4, username), first_name=COALESCE($5, first_name), last_name=COALESCE($6, last_name), birth_date=COALESCE($7, birth_date), updated_at=$8, image=COALESCE($9, image) WHERE id=$10 RETURNING*";
        const timestamp = new Date(Date.now());
        db.query(sqlQuery, [email_address, delivery_address, mobile_number, username, first_name, last_name, birth_date, timestamp, image, id])
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
    getSingleUser,
    updateUser
};