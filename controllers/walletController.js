const mongoose = require("mongoose");
const wallet = mongoose.model("wallet");


exports.addExpense = async(req, res) => {

    wallet.updateOne({
        userID: req.user._id
    },
    {
        $push:{expense:{
            "category": req.body.category,
            "amount": Number(req.body.amount),
            "date": req.body.date,
            "account": req.body.account,
            "comment": req.body.comment
        }}
    },function(err, cb) {
        console.log(err);
        
    }
    )


    res.redirect("/app_home");
    
}

exports.start = async(req, res) => {
    //asignar el id del usuario loggeado al modelo de mongo
    wallet.userID = req.user._id;
    const wall = new wallet({userID: req.user._id});

    console.log(wall);
    
    await wall.save();
    //guardar en la base de datos
    
    res.redirect("/app_home");
}

exports.addIncome = async(req, res) => {
    wallet.updateOne({
        userID: req.user._id
    },
    {
        $push:{income:{
            "category": req.body.category,
            "amount": Number(req.body.amount),
            "date": req.body.date,
            "account": req.body.account,
            "comment": req.body.comment
        }}
    },function(err, cb) {
        console.log(err);
        
    }
    )


    res.redirect("/app_home");
  
}