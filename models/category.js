const mongoose = require("mongoose");
mongoose.Promise = global.Promise;

categorySchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    }
})