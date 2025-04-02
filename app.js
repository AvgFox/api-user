const express = require("express");
const app = express();
const sequelize = require("sequelize");
const connection = require("./config/database");
const bodyParser = require("body-parser");
const User = require("./models/User");
const userRoutes = require("./routes/userRoutes");

app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());
app.use("/", userRoutes);


app.listen(8080, () =>{
    console.log('Servidor Rodando...');
});

