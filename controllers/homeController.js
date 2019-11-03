const mongoose = require("mongoose");
const wallet = mongoose.model("wallet");
const categories = mongoose.model("category");

exports.showHome = async(req, res) => {


    const a = wallet.countDocuments({userID: req.user._id}, function(err, count){
        if(count > 0){
            res.redirect("/app_home")

        }else{
            res.render("getStarted" ,{
                layout: 'home.handlebars',
                tittle: "Wall-E",
                data: false
                
            });

        }
    })

    
    
};


exports.showAppHome = async(req, res) => {
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

    
    


    res.render("start" ,{
        layout: 'home.handlebars',
        tittle: "Wall-E",
        incomes: wall.income,
        cate: cat,
        data: wall,
        chartData: JSON.stringify(wall),
        expenses: wall.expense,
        Card: creditCard,
        save: savingsS,
        actualURL: "app_home"

    });
    
}

exports.showLanding = function(req, res){
    res.render("landing");
};

exports.Error = async(req, res) => {

    if(req.user){
        

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

        res.render("404", {
            layout: "home.handlebars",
            tittle: "Wall-E",
            incomes: wall.income,
            cate: cat,
            data: wall,
            chartData: JSON.stringify(wall),
            expenses: wall.expense,
            Card: creditCard,
            save: savingsS,
            actualURL: "app_home",
            message: 'ruta '+req.url+' no encontrada.' 
        })
    } else {

        res.render("404", {
            layout: "home.handlebars",
            tittle: "Wall-E",
            actualURL: "app_home",
            message: 'ruta '+req.url+' no encontrada.' 
        })


    }

    

    
    

    
}