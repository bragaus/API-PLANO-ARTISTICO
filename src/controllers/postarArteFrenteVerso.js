const conexao = require('../models/conexao');

function postarArteFrenteVerso(req, resultado) {

    const { titulo, desc: descricao, tipo } = req.body;

    console.log(req.files);

    const { 
        originalname: nomeOriginal, 
        location: urlFrente, 
        key: chaveArteFrente, 
        size: tamanhoArquivo
    } = req.files[0];

    const { location: urlVerso, key: chaveArteVerso } = req.files[1];
    const { location: urlPreview, key: chave } = req.files[2];

    const arquivoBlob = req.arquivoBlob;

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
            tamanhoArquivo,
            arquivoBlob
        ]
    ]

    conexao.query(`INSERT INTO postagem(titulo, nomeOriginal, chave, chaveArteFrente, chaveArteVerso, descricao, tipo, urlPreview, urlFrente, urlVerso, tamanhoArquivo, arquivoBlob) VALUES (?)`, valores, (req, res) => {
        return resultado.json();
    }); 
};

module.exports = postarArteFrenteVerso;
