const db = require("../config/db");

const createPromo = (body) => {
    return new Promise((resolve, reject) => {
        const { promo_name, description_promo, promo_code } = body;
        const sqlQuery =
            "INSERT INTO promos(promo_name, description_promo, promo_code) VALUES ($1, $2, $3);";
        db.query(sqlQuery, [promo_name, description_promo, promo_code])
            .then(result => {
                const response = {
                    data: result.body,
                };
                resolve(response);
            })
            .catch((err) => reject({ status: 500, err }));
    });
};

const listAllPromo = () => {
    return new Promise((resolve, reject) => {
        db.query("SELECT * FROM promos")
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

const deletePromo = (id) => {
    return new Promise((resolve, reject) => {
        const sqlQuery =
            "DELETE FROM promos WHERE id = $1 RETURNING *";
        db.query(sqlQuery, [id])
            .then(({ body }) => {
                const response = {
                    data: body,
                };
                resolve(response);
            })
            .catch((err) => reject({ status: 404, err }));
    });
};

const updatePromo = (id, body) => {
    return new Promise((resolve, reject) => {
        const { promo_name, description_promo, promo_code } = body;
        const sqlQuery =
            "UPDATE promos SET promo_name=$1, description_promo=$2, promo_code=$3 WHERE id = $4";
        db.query(sqlQuery, [promo_name, description_promo, promo_code, id])
            .then(({ rows }) => {
                const response = {
                    data: rows[0],
                };
                resolve(response);
            })
            .catch((err) => reject({ status: 500, err }));
    });
};

const searchPromo = (query) => {
    return new Promise((resolve, reject) => {
        const promoName = query.promo_name;
        const sqlQuery = "select * from promos where lower(promo_name) like lower('%' || $1 || '%')";
        db.query(sqlQuery, [promoName])
            .then((result) => {
                if (result.rows.length === 0) {
                    return reject({ status: 404, err: "promo Not Found" });
                }
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
module.exports = {
    createPromo,
    listAllPromo,
    deletePromo,
    updatePromo,
    searchPromo
};