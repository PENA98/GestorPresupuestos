const mongoose = require("mongoose");
const wallet = mongoose.model("wallet");

exports.showHome = async(req, res) => {
    const a = wallet.countDocuments({userID: req.user._id}, function(err, count){
        if(count > 0){
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
    console.log(wall)

    console.log(wall.income[0].amount);
    console.log(Array.isArray(wall.income));
    
    let creditCard = false
    let savingsS = false

    if(wall.creditCard.length > 0 ) {
        creditCard = true
    }

    if(wall.savings.length > 0 ) {
        savingsS = true
    }

    
    
    console.log(creditCard);
    
    res.render("start" ,{
        layout: 'home.handlebars',
        tittle: "Wall-E",
        incomes: wall.income,
        expenses: wall.expense,
        Card: creditCard,
        save: savingsS

    });
    
}

exports.showLanding = function(req, res){
    res.render("landing");
};
