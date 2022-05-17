const express = require("express");

const Router = express.Router();

const usersController = require("../controllers/usersControllers");
const { UsersData } = require("../middlewares/validate");
const { checkToken } = require("../middlewares/auth");
const imageUpload = require("../middlewares/uploadUsers");
// const { successResponse, errorResponse } = require("../helpers/response");
// const db = require("../config/db");

// memasukkan user baru
Router.post("/", UsersData, usersController.create);
// melakukan pencarian user
Router.get("/", checkToken, usersController.getAll);
// Update user
// Router.put("/:id", checkToken, UsersData, usersController.update);
Router.patch("/:username", checkToken, UsersData, imageUpload.single("photo"), usersController.update);

module.exports = Router;