const conexao = require('../models/conexao');
const aws = require('aws-sdk');
const s3 = new aws.S3();

// Deletar a arte do CDN
module.exports = function deletarArteDoCDN(id) {
    conexao.query('SELECT chave, chaveArteFrente, chaveArteVerso FROM postagem WHERE ID = ?', id,
        function (erro, resultado) {
            
            if (erro) {
                return console.log(erro);
            }

            // se for arte frente e verso
            if (typeof resultado[0].chaveArteFrente === "undefined" || resultado[0].chaveArteFrente !== null) {
                const chaveArteFrente = resultado[0].chaveArteFrente
                const chaveArteVerso = resultado[0].chaveArteVerso
                const chave = resultado[0].chave

                // Junta todas as chaves
                const chaves = [
                    chaveArteFrente,
                    chaveArteVerso,
                    chave
                ]

                // percorre todas as chaves
                chaves.forEach((chave) => {
                    const parametros = { Bucket: process.env.BUCKET_NAME, Key: chave }
                    s3.deleteObject(parametros, function (erro) {
                        if (erro) {
                            console.log(erro, erro.stack);
                        }
                    });                    
                })
               
            } else {
                const chave = resultado[0].chave
                const parametros = { Bucket: process.env.BUCKET_NAME, Key: chave }
                s3.deleteObject(parametros, function (erro) {
                    if (erro) {
                        console.log(erro, erro.stack);
                    }
                });                
            }
    });
};