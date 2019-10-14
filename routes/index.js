const express = require("express");
const router = express.Router();
const { check } = require("express-validator");
const homeController = require("../controllers/homeController");
const userController = require("../controllers/userController");

module.exports = () => {

    // home routes
    router.get("/", homeController.showLanding);
    router.get("/home", homeController.showHome)


    // user routes
    //login
    router.get("/login", userController.showLogin);
    router.post("/login", userController.authenticateUser);

    //register
    router.get("/register", userController.showRegister);
    router.post("/register",[
        check("name", "El nombre de usuario es requerido.")
            .not()
            .isEmpty()
            .escape(),
        check("email","El correo electrónico es requerido.")
            .not()
            .isEmpty(),
        check("email", "El correo electrónico no es vålido.")
            .isEmail()
            .normalizeEmail(),
        check("password", "La contraseña es requerida.")
            .not()
            .isEmpty(),
        check("confirm-password", "Debe ingresar la confirmacion de su contraseña.")
            .not()
            .isEmpty(),
        check("confirm-password", "Las contraseñas no coinciden.")
            .custom((value, { req }) => value === req.body.password)
    ], userController.saveUser);


    return router;
};