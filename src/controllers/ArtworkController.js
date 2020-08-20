const conexao = require('../models/conexao');

class ArtworkController {
    index(req, resposta) {
        const artwork = conexao.query('SELECT * FROM postagem ORDER BY ID DESC', (req, res) => {
            return resposta.json(res);
        });
    }
}

module.exports = ArtworkController;