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
        
    }
    )

    req.flash("Hecho",["Gasto agregado correctamente."])
    res.redirect(req.params.url.replace(":", "/"));
    
}

exports.start = async(req, res) => {
    //asignar el id del usuario loggeado al modelo de mongo

    let d = new Date();
    let month1 = d.getMonth();

    const wall = new wallet({
        userID: req.user._id,
        salary: req.body.salary,
        budget: {amount: req.body.budget, month: month1},
        account: {name: req.body.accountName}

    });

    
    await wall.save(function(err, cb){
        
    });

    const cat = new categories({
        userID: req.user._id
    })

    await cat.save(function(err, cb){
        
    })

    req.flash("Hecho",["Has iniciado a usar Wall-E."])
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
        
    }
    );
    req.flash("Hecho",["Ingreso agregado correctamente."])
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

        
    }
    )

    req.flash("Hecho",["Tarjeta creada correctamente."])
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
        
    }
    )

    req.flash("Hecho",["Ahorro creado correctamente."])
    res.redirect(req.params.url.replace(":", "/"));
    
}

exports.saveAdder = async(req, res) => {

    
    const sav = await wallet.findOne({
        userID: req.user._id,
        'savings.name': req.body.saveName
    },
    function(err, cb){

     
    }).catch(function(err,cb){    
    });;
    
    let realIndex = 0;
    sav.savings.forEach(function(a, index){
        if (a.name == req.body.saveName) {
            realIndex = index
            
        }
    })
    let sum
    await new Promise((resolve, reject) => {
        sum = Number(Number(sav.savings[realIndex].amount) + Number(req.body.amount))
        resolve(true)
    })
    
    
    await wallet.updateOne({
        userID: req.user._id, "savings._id": sav.savings[realIndex]._id
    },
    {
        $set:{"savings.$.amount":sum}
    },function(err, cb) {

        
    }
    )
    req.flash("Hecho",["Ahorro agregado correctamente."])
    res.redirect(req.params.url.replace(":", "/"));

}

exports.cardAdder = async(req, res) => {

    let car = await wallet.findOne({
        userID: req.user._id,
        'creditCard.name': req.body.cardName
    },
    function(err, cb){

           
    });

    let realIndex = 0;
    car.creditCard.forEach(function(a, index){
        if (a.name == req.body.cardName) {
            realIndex = index
            
        }

        
    });

    const sum = Number(Number(car.creditCard[realIndex].amount) + Number(req.body.amount))
    
    wallet.updateOne({
        userID: req.user._id, "creditCard._id": car.creditCard[realIndex]._id
    },
    {
        $set:{"creditCard.$.amount":sum}
    },function(err, cb) {

        
    }
    )
    req.flash("Hecho",["Gasto de tarjeta agregado correctamente."])
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

exports.editData = async (req, res) => {

    
    if (req.params.cat == "income") {
        
        wallet.updateOne({
            userID: req.user._id, "income._id": req.params.id
        },
        {
            $set:{
                "income.$.amount": req.body.Valor5.substr(2),
                "income.$.comment": req.body.Descripcion2
            }
        },function(err, cb) {

            
        }
        )
        
    } else if(req.params.cat == "expense"){
        wallet.updateOne({
            userID: req.user._id, "expense._id": req.params.id
        },
        {
            $set:{
                "expense.$.amount": req.body.Valor5.substr(2),
                "expense.$.comment": req.body.Descripcion2
            }
        },function(err, cb) {

            
        }
        )
    }

    res.redirect("/transactions")
}

exports.deleteData = async(req, res) => {



    if (req.params.cat == "income") {
            
            wallet.updateOne({
                userID: req.user._id
            },
            {
                $pull: {"income":{_id: req.params.id}}
            },function(err, cb) {

                
            }
            )
            
        } else if(req.params.cat == "expense"){
            wallet.updateOne({
                userID: req.user._id
            },
            {
                $pull: {"expense": {_id: req.params.id}}
            },function(err, cb) {

                
            }
            )
        }
        req.flash("Hecho",["Eliminado correntamente."])
        res.redirect("/transactions")
}
