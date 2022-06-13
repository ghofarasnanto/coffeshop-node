const transactionsModels = require("../models/transactionsModels");
const {
    createTransaction,
    listAllTransactions,
    TransactionsById,
    updateTransaction,
    deleteTransaction
} = transactionsModels;

const create = (req, res) => {
    createTransaction(req.body)
        .then(({ data }) => {
            return res.status(201).send({
                message: "Order Product Success",
                data,
            });
        })
        .catch(({ err }) => {
            res.status(400).send({
                message: "Order Product Failed",
                errors: err
            });
        });
};


const getAll = (_, res) => {
    listAllTransactions()
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


const getById = (req, res) => {
    const id = req.params.id;
    TransactionsById(id)
        .then(({ data }) => {
            return res.status(201).send({
                message: "Transaction Found",
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
    deleteTransaction(req.params.id)
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
    updateTransaction(req.params.id, req.body)
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
// shorthand object
module.exports = {
    create,
    getAll,
    getById,
    update,
    remove
};