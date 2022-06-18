const db = require("../config/db");

// const createProduct = (body) => {
//     return new Promise((resolve, reject) => {
//         const { product_name, description, price } = body;
//         const sqlQuery =
//             "INSERT INTO products(product_name, description, price) VALUES ($1, $2, $3) RETURNING*;";
//         db.query(sqlQuery, [product_name, description, price])
//             .then(result => {
//                 const response = {
//                     data: result.body,
//                 };
//                 resolve(response);
//                 console.log(response);
//             })
//             .catch((err) => reject({ status: 500, err }));

//     });
// };

const createProduct = (body) => {
    return new Promise((resolve, reject) => {
        const { product_name, description, price } = body;
        const sqlQuery =
            "INSERT INTO products(product_name, description, price, created_at) VALUES ($1, $2, $3, $4);";
        const timestamp = new Date(Date.now());
        db.query(sqlQuery, [product_name, description, price, timestamp])
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

const getSingleProduct = (id) => {
    return new Promise((resolve, reject) => {
        // parameterized query
        const sqlQuery = "select *, category.category_name from products INNER JOIN category ON products.category_id=category.id where id = $1";
        db.query(sqlQuery, [id])
            .then((data) => {
                if (data.rows.length === 0) {
                    return reject({ status: 404, err: "Product Not Found" });
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
        const { product_name, category, order, sort, limit, page = 1 } = query;
        let sqlQuery = !product_name ? "SELECT * FROM products" : "select *, products.id as id from products INNER JOIN category ON products.category_id=category.id where lower(product_name) like lower ('%' || $1 || '%')";
        if (!product_name && category) {
            sqlQuery += " WHERE category_id=$1";
        }
        if (product_name && category) {
            sqlQuery += " AND category_id=$2";
        }
        if (order) {
            sqlQuery += " order by " + order + " " + sort;
        }
        const offset = (parseInt(page) - 1) * Number(limit);
        sqlQuery += " LIMIT " + Number(limit) + " OFFSET " + offset;
        // console.log(sqlQuery);
        // ternary if !category ? null : [category]; if (?) category undefined set null else (:) set [category]
        let params = !product_name ? [] : [product_name];
        if (category) {
            params.push(parseInt(category));
        }
        db.query(sqlQuery, params)
            .then((result) => {
                if (result.rows.length === 0) {
                    return reject({ status: 404, err: "product Not Found" });
                }
                const response = {
                    data: result.rows,
                };
                let sqlQuery = !product_name ? "SELECT COUNT(*) as total FROM products" : "select count(*) as total from products INNER JOIN category ON products.category_id=category.id where lower(product_name) like lower ('%' || $1 || '%')";
                if (!product_name && category) {
                    sqlQuery += " WHERE category_id=$1";
                }
                if (product_name && category) {
                    sqlQuery += " AND category_id=$2";
                }

                db.query(sqlQuery, params)
                    .then((result) => {
                        response.total_data = parseInt(result.rows[0]["total"]);
                        response.page = parseInt(page);
                        response.per_page = parseInt(limit);
                        response.total_page = Math.ceil(
                            response.total_data / response.per_page
                        );
                        resolve(response);
                        console.log(response);
                    })
                    .catch((err) => {
                        reject({ status: 500, err });
                    });
            })
            .catch((err) => {
                console.log(err);
                reject({ status: 500, err });
            });
    });
};

const updateProduct = (id, body, image) => {
    return new Promise((resolve, reject) => {
        const { product_name, price, description } = body;
        const sqlQuery =
            "UPDATE products SET product_name=COALESCE($1, product_name), price=COALESCE($2, price), description=COALESCE($3, description), updated_at=$4, image=COALESCE($5, image) WHERE id=$6 RETURNING *";
        const timestamp = new Date(Date.now());
        // console.log(sqlQuery);
        db.query(sqlQuery, [product_name, price, description, timestamp, image, id])
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
            "DELETE FROM products WHERE id = $1";
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
        const sqlQuery = "select * from products where lower(product_name) like lower('%' || $1 || '%') ";
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
    getSingleProduct,
    searchProduct,
    findProduct,
    updateProduct,
    deleteProduct
};