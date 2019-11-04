const mongoose = require("mongoose");
const User = mongoose.model("user")
const { validationResult } = require("express-validator");
const passport = require("passport");
const multer = require("multer");
const shortid = require("shortid");
const wallet = mongoose.model("wallet");
const categories = mongoose.model("category");
const bcrypt = require("bcrypt")
const crypto = require("crypto");
const enviarEmail = require("../handlers/email");

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
        
        
        res.render("register",{
            messages: req.flash(),
            alt: JSON.stringify(errorsArray)
        });
    }else{
        //crear el usuario

        const user = new User(req.body)

        await user.save();

        res.redirect("/login")

    }
}

exports.authenticateUser = function(req, res, next){
    passport.authenticate('local', {
        successRedirect: "/home",
        failureRedirect: "/login",
        failureFlash: true
    })(req, res, next);
}

exports.logOut = function(req, res){
    req.logout();
    req.flash("Cerraste sesión")
    res.redirect("/login");
}

exports.profile = async(req, res) => {
    const wall = await wallet.findOne({userID: req.user._id});
    const cat = await categories.findOne({userID: req.user._id});

    
    let creditCard = false
    let savingsS = false

    if(wall.creditCard.length > 0 ) {
        creditCard = true
    }

    if(wall.savings.length > 0 ) {
        savingsS = true
    }
    res.render("profile",{
        layout: "home.handlebars",
        tittle: "Wall-E",
        incomes: wall.income,
        cate: cat,
        data: wall,
        chartData: JSON.stringify(wall),
        expenses: wall.expense,
        Card: creditCard,
        save: savingsS,
        actualURL: "profile"
    });
}



exports.editProfile = async (req, res) => {
    // Buscar el usuario
    const user1 = await User.findById(req.user._id);
  
    // Modificar los valores
    user1.name = req.body.name;
    user1.email = req.body.email;
  
    await new Promise((resolve, reject) => {
        bcrypt.compare(req.body.password, user1.password, function(err, isMatch){
        if (err) throw err;

        if (isMatch) {
            if (req.body.new_password) {
                if (req.body.new_password == req.body.new_password_confirm ) {
                    user1.password = req.body.new_password;
                    resolve(user1.password)
                } else {
                    req.flash("error", ["las contraseñas no coinciden."]);
                }
            } else {
                resolve(true)
            }

        } else {
            req.flash("error", ["contraseña actual incorrecta."]);
        }
    })});

  
    // Verificar si el usuario agrega una imagen
    if (req.file) {
        user1.image = req.file.filename;
    }
  
    console.log(user1);
    
    // Guardar los cambios
    await user1.save(function(err, cb){
        console.log(err);
        
    });
  
    req.flash("Hecho", ["Cambios almacenados correctamente"]);
  
    // Redireccionar
    res.redirect("/profile");
  };

// Subir una imagen al servidor
exports.uploadImage = (req, res, next) => {
    upload(req, res, function(error) {
      if (error) {
        // Errores de multer
        if (error instanceof multer.MulterError) {
          if (error.code === "LIMIT_FILE_SIZE") {
            req.flash("error", [
              "El tamaño del archivo es demasiado grande. Máximo 200Kb"
            ]);
          } else {
            req.flash("error", [error.message]);
          }
        } else {
          // Errores del usuario
          req.flash("error", [error.message]);
        }
        // Redireccionar
        res.redirect("/profile");
        return;
      } else {
        return next();
      }
    });
  };

// Opciones de configuracion de Multer
const configuracionMulter = {
    // Tamaño máximo del archivo en bytes
    limits: {
      fileSize: 2000000
    },
    // Dónde se almacena la imagen
    storage: (fileStorage = multer.diskStorage({
      destination: (req, res, cb) => {
        cb(null, __dirname + "../../public/uploads/profiles");
      },
      filename: (req, file, cb) => {
        const extension = file.mimetype.split("/")[1];
        cb(null, `${shortid.generate()}.${extension}`);
      }
    })),
    // Verificar que es una imagen válida mediante el mimetype
    // http://www.iana.org/assignments/media-types/media-types.xhtml
    fileFilter(req, file, cb) {
      if (file.mimetype === "image/jpeg" || file.mimetype === "image/png") {
        // El callback se ejecuta como true or false
        // se retorna true cuando se acepta la imagen
        cb(null, true);
      } else {
        cb(new Error("Formato de archivo no válido. Solo JPEG o PNG."), false);
      }
    }
  };
  
  const upload = multer(configuracionMulter).single("image");


  exports.showRes = async(req, res) => {
      res.render("resetPassword")
  }
  
  exports.sendToken = async (req, res) => {
    // Verificar si el correo electrónico es válido
    const user = await User.findOne({ email: req.body.email });
  
    // Si el usuario no existe
    if (!user) {
      req.flash("error", ["El correo electrónico ingresado no existe"]);
      return res.redirect("/reestablecerPassword");
    }
  
    // El usuario existe, generar el token
    user.token = crypto.randomBytes(20).toString("hex");
    user.expira = Date.now() + 3600000;
  
    // Guardar el usuario
    await user.save();
  
    // Generar la URL
    const resetUrl = `http://${req.headers.host}/reestablecerPassword/${user.token}`;
  
    // Enviar la notificación por email
    await enviarEmail.enviar({
        user,
      subject: "Reestablecer tu contraseña",
      template: "resetPassword",
      resetUrl
    });
  
    // Redireccionar
    req.flash("correcto", [
      "Verifica tu correo electrónico para seguir las instrucciones"
    ]);
    res.redirect("/iniciarSesion");
  };