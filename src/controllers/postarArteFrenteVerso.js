const conexao = require('../models/conexao');

function postarArteFrenteVerso(req, resultado) {

    const { titulo, desc: descricao, tipo } = req.body;

    const { 
        originalname: nomeOriginal, 
        location: urlPreview, 
        key: chave, 
        size: tamanhoArquivo
    } = req.files[0];

    const { location: urlFrente, key: chaveArteFrente } = req.files[1];
    const { location: urlVerso, key: chaveArteVerso } = req.files[2];

    valores = [
        [
            titulo, 
            nomeOriginal, 
            chave,
            chaveArteFrente,
            chaveArteVerso,
            descricao, 
            tipo, 
            urlPreview, 
            urlFrente, 
            urlVerso, 
            tamanhoArquivo
        ]
    ]

    conexao.query(`INSERT INTO postagem(titulo, nomeOriginal, chave, chaveArteFrente, chaveArteVerso, descricao, tipo, urlPreview, urlFrente, urlVerso, tamanhoArquivo) VALUES (?)`, valores, (req, res) => {
        return resultado.json(res)
    }); 
};

module.exports = postarArteFrenteVerso;
