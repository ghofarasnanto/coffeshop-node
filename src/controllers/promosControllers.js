const promosModels = require("../models/promosModels");
const {
    createPromo,
    listAllPromo,
    deletePromo,
    updatePromo,
    searchPromo
} = promosModels;

const create = (req, res) => {
    createPromo(req.body)
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

const getAll = (_, res) => {
    listAllPromo()
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
const remove = (req, res) => {
    deletePromo(req.params.id)
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
    updatePromo(req.params.id, req.body)
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
    searchPromo(req.query)
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
    getAll,
    remove,
    update,
    search

};