const mongoose = require("mongoose");
const categories = mongoose.model("category");
const wallet = mongoose.model("wallet");


exports.showCategories = async(req, res) => {
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

    
    res.render("categories" ,{
        layout: 'home.handlebars',
        tittle: "Wall-E",
        incomes: wall.income,
        data: wall,
        cate: cat,
        chartData: JSON.stringify(wall),
        expenses: wall.expense,
        Card: creditCard,
        save: savingsS,
        actualURL: "categories"

    });
}

exports.saveCategory = async(req, res) => {

        categories.updateOne({
            userID: req.user._id
        },
        {
            $push:{category:{
                "name": req.body.Name,   
            }}
        },function(err, cb) {
            console.log(err);
            
        }
        )
    
    res.redirect(req.params.url.replace(":", "/"));
}