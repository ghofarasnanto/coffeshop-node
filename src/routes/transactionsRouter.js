const express = require("express");

const Router = express.Router();

const transactionsController = require("../controllers/transactionsControllers");
const { checkToken } = require("../middlewares/auth");

// memasukkan transaction baru
Router.post("/create", checkToken, transactionsController.create);
//melakukan pencarian transaction
Router.get("/", transactionsController.getAll);
// Update transaction
Router.put("/:id", checkToken, transactionsController.update);
// Menghapus transaction
Router.delete("/:id", checkToken, transactionsController.remove);


module.exports = Router;