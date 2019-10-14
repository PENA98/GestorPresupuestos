const mongoose = require("mongoose");
require("dotenv").config({ path: "variables.env"});

// Configuracion de mongoose
mongoose.connect(process.env.DATABASE, {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

mongoose.connection.on("error", error => {
    console.log(error);
});

require("../models/wallet");
require("../models/user");
require("../models/category");