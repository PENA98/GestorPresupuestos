const mongoose = require("mongoose");
const wallet = mongoose.model("wallet");

exports.showHome = function(req, res){


    wallet.countDocuments({userID: req.user._id}, function(err, count){
        if(count>0){
            res.render("start" ,{
                layout: 'home.handlebars',
                tittle: "Wall-E"
            });
            console.log("existe")
        }else{
            res.render("getStarted" ,{
                layout: 'home.handlebars',
                tittle: "Wall-E"
            });
            console.log("Nel")
        }
    })
    
};



exports.showLanding = function(req, res){
    res.render("landing");
};
