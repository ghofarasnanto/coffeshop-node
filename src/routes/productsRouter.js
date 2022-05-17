const express = require("express");

const Router = express.Router();

const productsControllers = require("../controllers/productsControllers");
const { productsData } = require("../middlewares/validate");
const { checkToken } = require("../middlewares/auth");
const imageUpload = require("../middlewares/uploadProduct");

// memasukkan product baru
Router.post("/", checkToken, productsData, productsControllers.create);
// melakukan pencarian product
// Router.get("/", productsControllers.getAll);
// Search product 
// Router.get("/search", productsControllers.search); //gabung with filter product
// mendapatkan product 
Router.get("/", productsControllers.filterProduct); //gabung with search 
// mendapatkan product byId
Router.get("/:id", productsControllers.showById);
// Update product
Router.patch("/:id", checkToken, productsData, imageUpload.single("photo"), productsControllers.update);
// Menghapus product
Router.delete("/:id", checkToken, productsControllers.remove);



module.exports = Router;