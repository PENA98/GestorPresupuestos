const mongoose = require("mongoose");
mongoose.Promise = global.Promise;

categorySchema = new mongoose.Schema({
    userID:{
        type: String,
        required: true,
        unique: true
    },
    category: [{
        name: {
            type: String,
            required: true
        }
    }]
})

module.exports = mongoose.model("category", categorySchema)