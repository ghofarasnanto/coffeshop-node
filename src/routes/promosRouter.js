const express = require("express");

const Router = express.Router();

const promosController = require("../controllers/promosControllers");

// memasukkan promo baru
Router.post("/", promosController.create);
// memfilter promo
Router.get("/", promosController.getAll);
// delete promo by ID
Router.delete("/:id", promosController.remove);
// Update promo
Router.put("/:id", promosController.update);
// search promo
Router.get("/", promosController.search);

module.exports = Router;