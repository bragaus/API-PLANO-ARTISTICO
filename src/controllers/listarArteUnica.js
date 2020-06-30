const conexao = require('../models/conexao');

async function listarArtes(req, resultado) {
    const id = req.params.id
    await conexao.query('SELECT * FROM postagem WHERE ID = ?', id, (req, res) => {
        return resultado.json(res)
    });
}

module.exports = listarArtes;