const mongoose = require("mongoose");
const wallet = mongoose.model("wallet");

exports.showHome = async(req, res) => {
    const a = wallet.countDocuments({userID: req.user._id}, function(err, count){
        if(count>0){
            res.redirect("/app_home")

        }else{
            res.render("getStarted" ,{
                layout: 'home.handlebars',
                tittle: "Wall-E"
            });

        }
    })
    
};


exports.showAppHome = async(req, res) => {
    const wall = await wallet.findOne({userID: req.user._id});
    console.log(wall.income)
    console.log(wall.income[0].amount);

    res.render("start" ,{
        layout: 'home.handlebars',
        tittle: "Wall-E",
        datos: wall.income

    });
    
}

exports.showLanding = function(req, res){
    res.render("landing");
};
