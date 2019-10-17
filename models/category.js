const mongoose = require("mongoose");
mongoose.Promise = global.Promise;

categorySchema = new mongoose.Schema({
    user:{
        email: {
            type: String,
            required: true
        }
    },
    name: [{
        type: String,
        required: true
    }]
})

module.exports = mongoose.model("Category", categorySchema)