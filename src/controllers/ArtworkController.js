const conexao = require('../models/conexao');

function PrepararEnvio(res) {
    // convertendo blob para base64
    const data = res ? res.map((e) => {
        e.blobPreview = new Buffer.from(e.blobPreview).toString('base64');
        e.blobFrente !== null ? e.blobFrente = new Buffer.from(e.blobFrente).toString('base64') : '';
        e.blobVerso !== null ? e.blobVerso = new Buffer.from(e.blobVerso).toString('base64') : '';
        return e
    }) : []

    return data
}

class ArtworkController {
    index(req, resposta) {
        conexao.query('SELECT * FROM postagem ORDER BY ID DESC', (req, res) => {

            const data = PrepararEnvio(res)

            return resposta.json(data);
        });
    }

    artwork({ params: {chave} }, resposta) {
        conexao.query('SELECT titulo, url, urlFrente, urlVerso, blobPreview, blobFrente, blobVerso FROM postagem WHERE chave = ?', chave, (req, res) => {

            const data = PrepararEnvio(res)
            
            return resposta.json(data)
        });
    }
}

module.exports = ArtworkController;