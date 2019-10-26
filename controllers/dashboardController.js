
const mongoose = require("mongoose");
const wallet = mongoose.model("wallet");

exports.showTable = async(req, res) => {

    const wall = await wallet.findOne({userID: req.user._id});

    res.render("transactions",{
        layout: "home.handlebars",
        data: wall,
        tittle: "Wall-E",
        incomes: wall.income,
        expenses: wall.expense
    })

}