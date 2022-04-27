const express = require("express");

const Router = express.Router();

const productsControllers = require("../controllers/productsControllers");
// const validate = require("../middlewares/validate");

// memasukkan product baru
Router.post("/", productsControllers.create);
// melakukan pencarian product
// Router.get("/", productsControllers.getAll);
// mendapatkan product 
Router.get("/", productsControllers.filterProduct);
// mendapatkan product byId
Router.get("/:id", productsControllers.showById);
// Update product
Router.put("/:id", productsControllers.update);
// Menghapus product
Router.delete("/:id", productsControllers.remove);
// Search product 
Router.get("/", productsControllers.search);



module.exports = Router;