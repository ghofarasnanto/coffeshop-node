const express = require("express");

const Router = express.Router();

const usersController = require("../controllers/usersControllers");

// memasukkan user baru
Router.post("/", usersController.create);
// melakukan pencarian user
Router.get("/", usersController.getAll);
// Update user
Router.put("/:id", usersController.update);

module.exports = Router;