const mongoose = require("mongoose");
mongoose.Promise = global.Promise;


const walletSchema = new  mongoose.Schema({  
    userID: {
        type: String,
        required: true,
        unique: true
    },
    salary: {
        type: Number
    },
    budget: [{
        amount: {
            type: Number
        },
        month: {
            type: String
        }
    }],
    income: [{
        category: {
            type: String
        },
        amount: {
            type: Number
        },
        date: {
            type: String
        },
        account: {
            type: String
        },
        comment: {
            type: String
        }
    }],
    acounts: [{
        name: {
            type: String
        },
        amount: {
            type: Number
        }

    }],
    creditCard: [{
        name: {
            type: String
        },
        limit: {
            type: Number
        },
        payDate:{
            type: String
        }
    }],
    savings: [{
        name: {
            type: String
        },
        goal: {
            type: Number
        },
        amount: {
            type: Number
        }
    }],
    expense: [{
        category: {
            type: String,
            required: true
        }, 
        amount: {
            type: Number,
            required: true
        },
        comment: {
            type: String
        },
        date: {
            type: String,
            required: true
        },
        account: {
            type: String,
            required: true
        }
    }]

})

module.exports = mongoose.model("wallet", walletSchema)