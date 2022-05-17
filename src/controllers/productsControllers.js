const productsModels = require("../models/productsModels");
const {
    createProduct,
    // listAllProducts,
    searchProduct,
    findProduct,
    getSingleProduct,
    updateProduct,
    deleteProduct
} = productsModels;

const create = (req, res) => {
    createProduct(req.body)
        .then(({ data }) => {
            return res.status(201).send({
                message: "Created Product Success",
                data,
            });
        })
        .catch(({ err }) => {
            res.status(400).send({
                message: "Created Product Failed",
                errors: err
            });
        });
};


// const getAll = (_, res) => {
//     listAllProducts()
//         .then(({ data, total }) => {
//             res.status(200).json({
//                 data,
//                 total,
//             });
//         })
//         .catch(({ status, err }) => {
//             res.status(status).json({
//                 data: [],
//                 err,
//             });
//         });
// };

const filterProduct = (req, res) => {

    findProduct(req.query)
        .then(({ data, total }) => {
            res.status(200).json({
                data,
                total,
            });
        })
        .catch(({ err }) => {
            res.status(400).send({
                message: "Product Not Found",
                errors: err
            });
        });
};

const showById = (req, res) => {
    const id = req.params.id;
    getSingleProduct(id)
        .then(({ data }) => {
            res.status(200).json({
                data,
            });
        })
        .catch((error) => {
            const { err, status } = error;
            res.status(status).json({
                // return empty object
                data: {},
                err,
            });
        });
};

const remove = (req, res) => {
    deleteProduct(req.params.id)
        .then(({ data }) => {
            return res.status(200).send({
                message: "Deleted Product Success",
                data,
            });
        })
        .catch(({ status, err }) => {
            res.status(status).json({
                err,
                data: [],
            });
        });
};

const update = (req, res) => {
    const image = req.file ? req.file.path.replace("public", "").replace(/\\/g, "/") : null;
    updateProduct(req.params.id, req.body, image)
        .then((result) => {
            const { data } = result;
            return res.status(200).send({
                message: "Update Product Success",
                data,
            });
        })
        .catch((error) => {
            const { err } = error;
            res.status(500).send({
                message: "Update Product Failed",
                errors: err,
                data: {},
            });
        });
};

const search = (req, res) => {
    searchProduct(req.query)
        .then(({ data, total }) => {
            return res.status(200).send({
                message: "Product Found",
                data,
                total,
            });
        })
        .catch(({ status, err }) => {
            res.status(status).json({
                err,
                data: [],
            });
        });
};
// shorthand object
module.exports = {
    create,
    // getAll,
    search,
    showById,
    filterProduct,
    remove,
    update
};