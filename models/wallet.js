const mongoose = require("mongoose");
mongoose.Promise = global.Promise;


const walletSchema = new  mongoose.Schema({  
    user:{
        type: String,
        required: true
    },
    acounts: [{
        name: {
            type: String,
        },
        amount: {
            type: Number
        }

    }],
    expense: [{
        category:{
            type: String,
            required: true
        }, 
        amount:{
            type: Boolean,
            required: true
        },
        comment:{
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