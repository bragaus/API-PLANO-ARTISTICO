const conexao = require('../models/conexao');

class ArtworkController {
    index(req, resposta) {
        conexao.query('SELECT * FROM postagem ORDER BY ID DESC', (req, res) => {

            // convertendo blob para base64
            const data = res ? res.map((e) => {
                e.arquivoBlob = new Buffer.from(e.arquivoBlob).toString('base64');
                return e
            }) : []

            return resposta.json(data);
        });
    }
}

module.exports = ArtworkController;