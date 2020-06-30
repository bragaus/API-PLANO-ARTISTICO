const aws = require('aws-sdk');
const mysql = require('mysql');
const s3 = new aws.S3();

function deletarArteDaAWS(values) {
    const connection = mysql.createConnection({
        host: 'localhost',
        port: 3306,
        user: 'bragaus',
        password: '2348659715889813',
        database: 'planoart'
    });

    connection.query('SELECT key_ FROM Post WHERE ID = ?', values,
        function (error, results, fields) {
            const key = results[0].key_
            const params = { Bucket: 'planoart', Key: key }

            s3.deleteObject(params, function (err, data) {
                if (err) console.log(err, err.stack);
                else console.log();
            });
            if (error)
                return console.log(error);
            else {
                connection.end();
            };
        });


};

module.exports = deletarArteDaAWS