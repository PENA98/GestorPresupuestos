const localStrategy = require("passport-local").Strategy;
const mongoose = require("mongoose");
const user = mongoose.model("user");
const bcrypt = require("bcrypt");

module.exports = function(passport){
    //Local Strategy
    passport.use(new localStrategy(function(username, password, done){
        console.log("soy la configuracion de passport")
        let query = { email:username }
        //verificar email
        user.findOne(query, function(err, user){
            console.log(user)
            if (err) throw err;
            if (!user) {
                return done(null, false, {message: "No se econtro el usuario"});
            }

            bcrypt.compare(password, user.password, function(err, isMatch){
                if (err) throw err;

                if (isMatch) {
                    console.log("Contraseña correcta")
                    return done(null, user);    
                } else {
                    console.log("Contraseña equivocada")
                    return done(null, false, {message: "Contraseña equivocada"});
                }
            });
        });


    }));

    passport.serializeUser(function(user, done) {
        done(null, user.id);
    });
      
    passport.deserializeUser(function(id, done) {
        user.findById(id, function(err, user) {
          done(err, user);
        });
    });
};