const conexao = require('../models/conexao');

function postarArte(req, resultado) {
    
    const { titulo, desc: descricao, tipo } = req.body;

    const { 
        originalname: nomeOriginal, 
        location: url, 
        key: chave, 
        size: tamanhoArquivo 
    } = req.file;

    const blobPreview = req.blobPreview;

    valores = [
        [titulo, nomeOriginal, chave, descricao, tipo, url, tamanhoArquivo, blobPreview]
    ];

    conexao.query(`INSERT INTO postagem(titulo, nomeOriginal, chave, descricao, tipo, url, tamanhoArquivo, blobPreview) VALUES (?)`, valores, (req, res) => {
        return resultado.json()
    });    

}

module.exports = postarArte;
