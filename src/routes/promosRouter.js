const express = require("express");

const Router = express.Router();

const promosController = require("../controllers/promosControllers");
const { checkToken } = require("../middlewares/auth");

// memasukkan promo baru
Router.post("/create", checkToken, promosController.create);
// memfilter promo
Router.get("/", promosController.getAll);
// delete promo by ID
Router.delete("/:id", checkToken, promosController.remove);
// Update promo
Router.put("/:id", checkToken, promosController.update);
// search promo
Router.get("/search", promosController.search);

module.exports = Router;