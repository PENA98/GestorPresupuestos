
const mongoose = require("mongoose");
const wallet = mongoose.model("wallet");
const categories = mongoose.model("category");

exports.showTable = async(req, res) => {

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

    res.render("transactions",{
        layout: "home.handlebars",
        data: wall,
        cate: cat,
        tittle: "Wall-E",
        incomes: wall.income,
        expenses: wall.expense,
        actualURL: "transactions",
        chartData: JSON.stringify(wall),
        Card: creditCard,
        save: savingsS,
    })

}