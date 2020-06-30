const conexao = require('./conexao');

function consulta(sql, valores, resposta) { 

    conexao.query(sql, valores, function(erros, respostas){
        if(erros)
            return console.log(erros);
        else
            return respostas
    });

};

module.exports = consulta;
