const usersModels = require("../models/usersModels");
const {
    createUser,
    listAllUser,
    updateUser
} = usersModels;

const create = (req, res) => {
    createUser(req.body)
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
    listAllUser()
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

const update = (req, res) => {
    updateUser(req.params.id, req.body)
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
    update
};