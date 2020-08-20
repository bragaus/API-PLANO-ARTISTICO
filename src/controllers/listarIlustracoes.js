const conexao = require('../models/conexao');

async function listarArtes(req, resultado) {
    await conexao.query('SELECT ID, titulo, nomeOriginal, chave, descricao, tipo, url, urlPreview, urlFrente, urlVerso, tamanhoArquivo, dataCriacao, direita, esquerda, cima, baixo, largura, chaveArteFrente, chaveArteVerso, zIndex FROM postagem WHERE tipo = "ILLUSTRATION" ORDER BY ID DESC', (req, res) => {
        return resultado.json(res)
    });
}

module.exports = listarArtes;