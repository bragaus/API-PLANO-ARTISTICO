const conexao = require('../models/conexao');

function postarArte(req, resultado) {
    
    const { titulo, desc: descricao, tipo } = req.body;

    const { 
        originalname: nomeOriginal, 
        location: url, 
        key: chave, 
        size: tamanhoArquivo 
    } = req.file;

    valores = [
        [titulo, nomeOriginal, chave, descricao, tipo, url, tamanhoArquivo]
    ]

    conexao.query(`INSERT INTO postagem(titulo, nomeOriginal, chave, descricao, tipo, url, tamanhoArquivo) VALUES (?)`, valores, (req, res) => {
        return resultado.json()
    });    

};

module.exports = postarArte
