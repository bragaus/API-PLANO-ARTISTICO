const conexao = require('../models/conexao');

function postarArte(req, resultado) {
    
    const { titulo, desc: descricao, tipo } = req.body;

    const { 
        originalname: nomeOriginal, 
        location: url, 
        key: chave, 
        size: tamanhoArquivo 
    } = req.file;

    const arquivoBlob = req.arquivoBlob

    valores = [
        [titulo, nomeOriginal, chave, descricao, tipo, url, tamanhoArquivo, arquivoBlob]
    ]

    conexao.query(`INSERT INTO postagem(titulo, nomeOriginal, chave, descricao, tipo, url, tamanhoArquivo, arquivoBlob) VALUES (?)`, valores, (req, res) => {
        return resultado.json()
    });    

};

module.exports = postarArte
