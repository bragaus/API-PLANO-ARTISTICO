const conexao = require('../models/conexao');

async function listarBlobs(req, resultado) {
    await conexao.query('SELECT ID, arquivoBlob FROM postagem WHERE tipo = "ILLUSTRATION" ORDER BY ID DESC', (req, res) => {
        return resultado.json(res)
    });
}

module.exports = listarBlobs;