const Sequelize = require("sequelize");
const connection = new Sequelize('api', 'root', 'password', {
    host: 'localhost',
    dialect: 'mysql',
    timezone: '-03:00'
});

module.exports = connection;
/*
function testeConn(){
    try {
        const conn = connection.authenticate();
        if(conn){
            console.log('conectado');
        }
    } catch (error) {
        console.log(error);
    }
}
*/