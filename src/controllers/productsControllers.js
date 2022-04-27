const productsModels = require("../models/productsModels");
const {
    createProduct,
    // listAllProducts,
    searchProduct,
    findProduct,
    getSingleProductFromServer,
    updateProduct,
    deleteProduct
} = productsModels;

const create = (req, res) => {
    createProduct(req.body)
        .then(({ data }) => {
            res.status(200).json({
                data,
            });
        })
        .catch(({ status, err }) => {
            res.status(status).json({
                data: [],
                err,
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
        .catch(({ status, err }) => {
            res.status(status).json({
                data: [],
                err,
            });
        });
};

const showById = (req, res) => {
    const id = req.params.id;
    getSingleProductFromServer(id)
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
            res.status(200).json({
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
    updateProduct(req.params.id, req.body)
        .then((result) => {
            const { data } = result;
            res.status(200).json({
                data,
            });
        })
        .catch((error) => {
            const { err, status } = error;
            res.status(status).json({
                err,
                data: {},
            });
        });
};

const search = (req, res) => {
    searchProduct(req.query)
        .then(({ data, total }) => {
            res.status(200).json({
                data,
                total,
            });
        })
        .catch(({ status, err }) => {
            res.status(status).json({
                data: [],
                err,
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