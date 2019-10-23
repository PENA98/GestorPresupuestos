const mongoose = require("mongoose");
mongoose.Promise = global.Promise;


const walletSchema = new  mongoose.Schema({  
    userID: {
        type: String,
        required: true
    },
    salary: {
        type: Number
    },
    income: [{
        name: {
            type: String
        },
        amount: {
            type: Number
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
            type: Date,
            required: true
        },
        account: {
            name: String
        }
    }]

})

module.exports = mongoose.model("wallet", walletSchema)