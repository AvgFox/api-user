const sequelize = require("sequelize");
const connection = require("../config/database");

const User = connection.define('users', {

    email: {
        type: sequelize.STRING,
        allowNull: false
    },
    password:{
        type: sequelize.STRING,
        allowNull: false
    }

});

//User.sync({force:true});

module.exports = User;