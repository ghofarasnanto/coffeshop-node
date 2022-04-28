const db = require("../config/db");

const createTransaction = (body) => {
    return new Promise((resolve, reject) => {
        const { item, quantity, delivery, subtotal, tax_shipping, payment_method, date, price, status } = body;
        const sqlQuery =
            "INSERT INTO transactions(item, quantity, delivery, subtotal, tax_shipping, payment_method, date, price, status) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9);";
        db.query(sqlQuery, [item, quantity, delivery, subtotal, tax_shipping, payment_method, date, price, status])
            .then(result => {
                const response = {
                    data: result.body,
                };
                resolve(response);
            })
            .catch((err) => reject({ status: 500, err }));
    });
};

const listAllTransactions = () => {
    return new Promise((resolve, reject) => {
        db.query("SELECT * FROM transactions")
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

const updateTransaction = (id, body) => {
    return new Promise((resolve, reject) => {
        const { product_name, price, description } = body;
        const sqlQuery =
            "UPDATE products SET product_name=$1, price=$2, description=$3 WHERE id = $4";
        db.query(sqlQuery, [product_name, price, description, id])
            .then(({ rows }) => {
                const response = {
                    data: rows[0],
                };
                resolve(response);
            })
            .catch((err) => reject({ status: 500, err }));
    });
};

const deleteTransaction = (id) => {
    return new Promise((resolve, reject) => {
        const sqlQuery =
            "DELETE FROM products WHERE id = $1 RETURNING *";
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
module.exports = {
    createTransaction,
    listAllTransactions,
    updateTransaction,
    deleteTransaction
};