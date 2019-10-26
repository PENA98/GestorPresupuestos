const express = require("express");
const router = express.Router();
const { check } = require("express-validator");
const homeController = require("../controllers/homeController");
const userController = require("../controllers/userController");
const walletController = require("../controllers/walletController")

module.exports = () => {

    // home routes
    router.get("/", homeController.showLanding);
    router.get("/home", homeController.showHome)
    router.get("/app_home", homeController.showAppHome)


    // user routes

    //logout
    router.get("/logout", userController.logOut);

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

    // rutas para los gastos
    router.get("/add_expense", walletController.addExpense)

    // ruta para añadir un ingreso
    router.post("/add_income", walletController.addIncome)
    // ruta start
    router.get("/start", walletController.start)

    // perfil
    router.get("/profile", userController.profile)
    return router;
};