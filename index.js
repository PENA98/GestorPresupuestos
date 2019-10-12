const mongoose = require('mongoose');
require("./config/db");
const express = require("express");
const expressHandleBars = require("express-handlebars");
const path = require("path");
const router = require("./routes/index");
const cookieParser = require("cookie-parser");
const session = require("express-session");
const MongoStore = require("connect-mongo")(session);
const bodyParser = require("body-parser")


// archivo para las variables de entorno
require("dotenv").config({ path: "variables.env"});

const app = express();

// habilitar body-parser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// habilitar handlebars como template engine
app.engine(
    "handlebars",
    expressHandleBars({
        defaultLayout: "layout",
        helpers: require("./helpers/handlebars")
    })
);

app.set("view engine", "handlebars");

app.use(express.static(path.join(__dirname,"public")));

app.use(cookieParser());

app.use(
    session({
        secret: process.env.SECRET,
        key: process.env.KEY,
        resave: false,
        saveUninitialized: false,
        store: new MongoStore({ mongooseConnection: mongoose.connection })
    })
);

app.use("/", router());

app.listen(process.env.PORT);