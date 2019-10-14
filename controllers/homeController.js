const mongoose = require("mongoose");
const wallet = mongoose.model("wallet");

exports.showHome = function(req, res){

    let wall = wallet.count()
    console.log(res.locals.user.email);
    console.log(wall);
    if (!wall) {
        res.render("getStarted" ,{
            layout: 'home.handlebars'
        });
    } else {
        res.render("form" ,{
            layout: 'home.handlebars'
        });
    }


   
};



exports.showLanding = function(req, res){
    res.render("landing");
};
