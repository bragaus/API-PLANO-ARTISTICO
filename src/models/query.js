// essa aqui é a antiga, guardei porq se der ruim nas outras duas vou voltar a usar essa
const mysql = require('mysql');

function query(sql, values, res) {
    const connection = mysql.createConnection({
        host: process.env.DB_HOST,
        port: process.env.DB_PORT,
        user: process.env.DB_USER,
        password: process.env.DB_PASS,
        database: process.env.DB_NAME        
    });    

    connection.query(sql, values, function(error, results, fields){
        if(error)
            return console.log(error);
        else
            connection.end();
    });
};

module.exports = query;
