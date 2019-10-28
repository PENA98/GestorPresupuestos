const mongoose = require("mongoose");
const wallet = mongoose.model("wallet");
const categories = mongoose.model("category");


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


    res.redirect(req.params.url.replace(":", "/"));
    
}

exports.start = async(req, res) => {
    //asignar el id del usuario loggeado al modelo de mongo
    const wall = new wallet({
        userID: req.user._id,
        salary: req.body.salary
    });

    const cat = new categories({
        userID: req.user._id
    })

    cat.save(function(err, cb){
        console.log(err);
        
    })

    wall.save(function(err, cb){
        console.log(err);
        
    });


    wallet.updateOne({
        userID: req.user._id
    },
    {
        $push: {account:{
            "name": req.body.accountName
        }}
    },
    function(err, cb){
        console.log(err);
    });

    let d = new Date();
    let month = d.getMonth();

    
    wallet.updateOne({
        userID: req.user._id
    },
    {
        $push: {budget:{
            "amount": req.body.budget,
            "month": month
        }}
    },
    function(err, cb){
        console.log(err);
    });
    
    
    res.redirect("/app_home");

    //guardar en la base de datos
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
    );

    res.redirect(req.params.url.replace(":", "/"));
  
}

exports.cardCreator = async(req, res) => {

    wallet.updateOne({
        userID: req.user._id
    },
    {
        $push:{creditCard:{
            "name": req.body.nameCard,
            "limit": Number(req.body.limit),
            "payDate": req.body.date,
            "amount": 0
        }}
    },function(err, cb) {
        console.log(err);
        
    }
    )

    
    res.redirect(req.params.url.replace(":", "/"));
    
}

exports.saveCreator = async(req, res) => {

    wallet.updateOne({
        userID: req.user._id
    },
    {
        $push:{savings:{
            "name": req.body.saveName,
            "goal": Number(req.body.goal),
            "amount": 0
        }}
    },function(err, cb) {
        console.log(err);
        
    }
    )

    
    res.redirect(req.params.url.replace(":", "/"));
    
}

exports.saveAdder = async(req, res) => {

    
    const sav = await wallet.findOne({
        'savings.name': req.body.saveName
    },
    function(err, cb){
        if (cb == null) {
            console.log("Que ondas");
            
        }
        console.log(err);

           
    }).catch(function(err,cb){
        console.log(err);
        
    });;
    console.log(sav);
    
    let realIndex = 0;
    sav.savings.forEach(function(a, index){
        if (a.name == req.body.saveName) {
            realIndex = index
            console.log("Funciona");
            
        }
        console.log(a);
        console.log(index);
        
        
    })
    
    const sum = Number(Number(sav.savings[realIndex].amount) + Number(req.body.amount))

    
    wallet.updateOne({
        userID: req.user._id, "savings._id": sav.savings[realIndex]._id
    },
    {
        $set:{"savings.$.amount":sum}
    },function(err, cb) {
        console.log(err);
        
    }
    )

    res.redirect(req.params.url.replace(":", "/"));

}

exports.cardAdder = async(req, res) => {

    let car = await wallet.findOne({
        'creditCard.name': req.body.cardName
    },
    function(err, cb){
        console.log(err);
           
    });

    let realIndex = 0;
    car.creditCard.forEach(function(a, index){
        if (a.name == req.body.cardName) {
            realIndex = index
            console.log("AHUEVOOOOOOOOOOOO");
            
        }
        console.log(a);
        console.log(index);
        
        
    });

    const sum = Number(Number(car.creditCard[realIndex].amount) + Number(req.body.amount))
    
    wallet.updateOne({
        userID: req.user._id, "creditCard._id": car.creditCard[realIndex]._id
    },
    {
        $set:{"creditCard.$.amount":sum}
    },function(err, cb) {
        console.log(err);
        
    }
    )

    res.redirect(req.params.url.replace(":", "/"));
}

exports.editExpense = async(req, res) => {
    const wall = await wallet.findOne({userID: req.user._id, "expense._id": req.params.url.replace(":", "")})

    let ind = 0;

    wall.expense.forEach(function(ex, index){
        if (ex._id == req.params.url.replace(":", "")) {
            ind = index
        }
    })

    console.log(wall.expense[ind]);


    res.render("transactions",{
        layout: "home.handlebars",
        edit: true,
        obj: wall.expense[ind]
    })
    
    
}

exports.showSavings = async(req, res) => {

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


    res.render("savings",{
        layout: 'home.handlebars',
        tittle: "Wall-E",
        incomes: wall.income,
        cate: cat,
        data: wall,
        expenses: wall.expense,
        Card: creditCard,
        chartData: JSON.stringify(wall),
        save: savingsS,
        actualURL: "savings"
    })
}

exports.showCards = async(req, res) => {

    
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


    res.render("cards",{
        layout: 'home.handlebars',
        tittle: "Wall-E",
        incomes: wall.income,
        cate: cat,
        data: wall,
        expenses: wall.expense,
        Card: creditCard,
        chartData: JSON.stringify(wall),
        save: savingsS,
        actualURL: "cards"
    })
}

exports.eliminarIncome = async(req, res) => {
    console.log("ads");
    
}