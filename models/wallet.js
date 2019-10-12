const mongoose = require("mongoose");
mongoose.Promise = global.Promise;


const walletSchema = new  mongoose.Schema({  
    user:{
        type: String,
        required: true
    },
    expense : [{
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
        }
    }]

})