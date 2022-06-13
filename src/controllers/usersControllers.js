const usersModels = require("../models/usersModels");
const {
    createUser,
    listAllUser,
    getSingleUser,
    updateUser
} = usersModels;

const create = (req, res) => {
    createUser(req.body)
        .then(({ data }) => {
            return res.status(200).send({
                message: "Created User Success",
                data,
            });
        })
        .catch(({ err }) => {
            res.status(400).send({
                message: "Created User Failed",
                errors: err
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
        .catch(({ err }) => {
            res.status(400).send({
                message: "User Not Found",
                errors: err
            });
        });
};

const getById = (req, res) => {
    const id = req.params.id;
    getSingleUser(id)
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

const update = (req, res) => {
    const image = req.file ? req.file.path.replace("public", "").replace(/\\/g, "/") : null;
    updateUser(req.params.username, req.body, image)
        .then((result) => {
            const { data } = result;
            return res.status(200).send({
                message: "Update User Success",
                data,
            });
        })
        .catch((error) => {
            const { err } = error;
            res.status(400).send({
                message: "Update User Failed",
                errors: err
            });
        });
};
// shorthand object
module.exports = {
    create,
    getAll,
    getById,
    update
};