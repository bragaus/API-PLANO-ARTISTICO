const conexao = require('../models/conexao');

async function listarArtes(req, resultado) {
    await conexao.query('SELECT * FROM postagem WHERE tipo = "Cover" ORDER BY ID DESC', (req, res) => {
        return resultado.json(res)
    });
}

module.exports = listarArtes;