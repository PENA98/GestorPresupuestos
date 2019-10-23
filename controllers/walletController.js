const mongoose = require("mongoose");
const wallet = mongoose.model("wallet");


exports.addExpense = async(req, res) => {

    wallet.countDocuments({userID: req.user._id}, function(err, count){
        if(count>0){
            console.log("existe")
        }else{
            console.log("Nel")
        }
    })
    
}

exports.start = async(req, res) => {
    //asignar el id del usuario loggeado al modelo de mongo
    wallet.userID = req.user._id;
    const wall = new wallet({userID: req.user._id});

    console.log(wall);
    
    await wall.save();
    //guardar en la base de datos
    
    res.redirect("/");
}