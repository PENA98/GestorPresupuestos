const mongoose = require("mongoose");
const User = mongoose.model("user")
const { validationResult } = require("express-validator");
const passport = require("passport");

exports.showLogin = function(req, res){
    res.render("login");
};

exports.showRegister = function(req, res){
    res.render("register");
};

exports.saveUser = async(req, res, next) => {

    //verificar que no existan errores de validacion
    const errors = validationResult(req);
    const errorsArray = [];

    //si hay errores
    if (!errors.isEmpty()) {
        errors.array().map(error => errorsArray.push(error.msg));
        
        //enviar los errores al usuario
        req.flash("error", errorsArray);
        console.log(errorsArray)
        res.render("register",{
            messages: req.flash()
        });
    }

    //crear el usuario

    const user = new User(req.body)

    await user.save();

    res.redirect("/login")

}

exports.authenticateUser = function(req, res, next){
    console.log("soy la configuracion controleer")
    console.log( req.body)
    passport.authenticate('local', {
        successRedirect: "/home",
        failureRedirect: "/",
        failureFlash: true
    })(req, res, next);
}