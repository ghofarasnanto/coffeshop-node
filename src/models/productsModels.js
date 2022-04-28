const db = require("../config/db");

const createProduct = (body) => {
    return new Promise((resolve, reject) => {
        const { product_name, description, price } = body;
        const sqlQuery =
            "INSERT INTO products(product_name, description, price) VALUES ($1, $2, $3);";
        db.query(sqlQuery, [product_name, description, price])
            .then(result => {
                const response = {
                    data: result.body,
                };
                resolve(response);
            })
            .catch((err) => reject({ status: 500, err }));
    });
};

const listAllProducts = () => {
    return new Promise((resolve, reject) => {
        db.query("SELECT * FROM products")
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

const getSingleProductFromServer = (id) => {
    return new Promise((resolve, reject) => {
        // parameterized query
        const sqlQuery = "select * from products where id = $1";
        db.query(sqlQuery, [id])
            .then((data) => {
                if (data.rows.length === 0) {
                    return reject({ status: 404, err: "Book Not Found" });
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

const findProduct = (query) => {
    return new Promise((resolve, reject) => {
        // asumsikan query berisikan category, order, sort
        const { category, order, sort } = query;
        let sqlQuery = !category ? "SELECT * FROM products" : "select * from products where lower(category) like lower('%' || $1 || '%')";
        if (order) {
            sqlQuery += " order by " + order + " " + sort;
        }
        // ternary if !category ? null : [category]; if (?) category undefined set null else (:) set [category]
        db.query(sqlQuery, !category ? null : [category])
            .then((result) => {
                if (result.rows.length === 0) {
                    return reject({ status: 404, err: "product Not Found" });
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

const updateProduct = (id, body) => {
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

const deleteProduct = (id) => {
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

const searchProduct = (query) => {
    return new Promise((resolve, reject) => {
        const productName = query.product_name;
        const sqlQuery = "select * from products where lower(product_name) like lower('%' || $1 || '%')";
        db.query(sqlQuery, [productName])
            .then((result) => {
                if (result.rows.length === 0) {
                    return reject({ status: 404, err: "product Not Found" });
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
    createProduct,
    listAllProducts,
    getSingleProductFromServer,
    searchProduct,
    findProduct,
    updateProduct,
    deleteProduct
};