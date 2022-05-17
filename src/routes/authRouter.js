const Router = require("express").Router();

const authController = require("../controllers/authControllers");
const { checkDuplicate } = require("../middlewares/auth");

// register
Router.post("/register", checkDuplicate, authController.register);
// // update password
// Router.post("/update-password", checkDuplicate, authController.password);
// sign in
Router.post("/signin", authController.signIn);
// sign out
Router.delete("/signout", (_, res) => {
    res.json({
        msg: "Berhasil Logout",
    });
});

module.exports = Router;