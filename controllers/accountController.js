const mongoose = require("mongoose");
const wallet = mongoose.model("wallet");
const categories = mongoose.model("category");

exports.showAccounts = async(req, res) => {

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

    

    res.render("accounts",{
        layout: "home.handlebars",
        tittle: "Wall-E",
        incomes: wall.income,
        cate: cat,
        data: wall,
        expenses: wall.expense,
        chartData: JSON.stringify(wall),
        Card: creditCard,
        save: savingsS,
        actualURL: "accounts"
    })
}

exports.addAccount = async(req, res) => {
    wallet.updateOne({
        userID: req.user._id
    },
    {
        $push:{account:{
            "name": req.body.Name,
            
        }}
    },function(err, cb) {
        console.log(err);
        
    }
    )

    
    res.redirect(req.params.url.replace(":", "/"));
}