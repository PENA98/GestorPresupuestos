const express = require("express");
const router = express.Router();
const { check } = require("express-validator");
const homeController = require("../controllers/homeController");
const userController = require("../controllers/userController");
const walletController = require("../controllers/walletController");
const dashboardController = require("../controllers/dashboardController");
const accountController = require("../controllers/accountController");
const categoriesController = require("../controllers/categoriesController");

module.exports = () => {

    // home routes
    router.get("/", homeController.showLanding);
    router.get("/home", userController.checkUser, homeController.showHome)
    router.get("/app_home", homeController.showAppHome)


    // user routes

    //logout
    router.get("/logout", userController.checkUser, userController.logOut);

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

    // rutas para añadir gastos
    router.post("/add_expense/:url", userController.checkUser, walletController.addExpense)

    // ruta para añadir ingresos
    router.post("/add_income/:url", userController.checkUser, walletController.addIncome)

    //ruta para añadir una tarjeta
    router.post("/add_card/:url", userController.checkUser, walletController.cardCreator)

    //ruta para añadir un ahorro
    router.post("/add_saving/:url", userController.checkUser, walletController.saveCreator)

    // ruta para añadir a un ahorro
    router.post("/add_savings/:url", userController.checkUser, walletController.saveAdder)

    //ruta para añadir una cuenta 

    router.post("/add_account/:url", userController.checkUser, accountController.addAccount)

    //ruta para añadir gasto a una tarjeta
    router.post("/add_cardExpense/:url", userController.checkUser, walletController.cardAdder)

    // ruta start
    router.post("/start", userController.checkUser, walletController.start)

    //ruta para editar datos de la tabla
    router.post("/edit/:cat/:id", userController.checkUser, walletController.editData)

    //ruta para eliminar datos de la tabla
    router.get("/delete/:cat/:id", userController.checkUser, walletController.deleteData)

    // ruta para las categorias
    router.get("/categories", userController.checkUser, categoriesController.showCategories)

    // rita para las tarjetas
    router.get("/cards", userController.checkUser, walletController.showCards)

    //ruta para editar gastos
    //router.get("/edit/:url", walletController.editExpense)

    //ruta para savings
    router.get("/savings", userController.checkUser, walletController.showSavings)

    // ruta para guardar las categorias
    router.post("/add_category/:url", userController.checkUser, categoriesController.saveCategory)

    //ruta para account
    router.get("/accounts", userController.checkUser,  accountController.showAccounts)

    // perfil
    router.get("/profile", userController.checkUser, userController.profile)

    //ruta para las transacciones (ver tablas)
    router.get("/transactions", userController.checkUser, dashboardController.showTable);

    // ruta para mostrar la vista de reseteo de password
    router.get("/reset_pass", userController.showRes)

    // ruta para enviar el token al usuario
    router.post("/reset_password", userController.sendToken)

    router.get("/resetPassword/:token", userController.showResetPass)

    router.post("/resetPassword/:token", userController.changePassword)

    //ruta para editar el perfil
    router.post("/editProfile", userController.checkUser, userController.uploadImage, userController.editProfile)

    // router.get("*", homeController.Error);
    return router;
};