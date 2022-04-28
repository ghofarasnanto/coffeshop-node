const express = require("express");

const Router = express.Router();

const pingRouter = require("./pingRouter");
const productsRouter = require("./productsRouter");
const usersRouter = require("./usersRouter");
const transactionsRouter = require("./transactionsRouter");
const promosRouter = require("./promosRouter");

Router.use("/ping", pingRouter);
Router.use("/products", productsRouter);
Router.use("/users", usersRouter);
Router.use("/transactions", transactionsRouter);
Router.use("/promos", promosRouter);


module.exports = Router;