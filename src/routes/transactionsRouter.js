const express = require("express");

const Router = express.Router();

const transactionsController = require("../controllers/transactionsControllers");

// memasukkan transaction baru
Router.post("/create", transactionsController.create);
//melakukan pencarian transaction
Router.get("/", transactionsController.getAll);
// Update transaction
Router.put("/:id", transactionsController.update);
// Menghapus transaction
Router.delete("/:id", transactionsController.remove);


module.exports = Router;