const conexao = require('../models/conexao');

async function listarArtes(req, resultado) {
    const artes = req.body
    
    artes.forEach(arte => {

        const {
            baixo,
            cima,
            descricao,
            direita,
            esquerda,
            largura,
            titulo,
            zIndex,
            ID
        } = arte

        valores = [
            baixo,
            cima,
            descricao,
            direita,
            esquerda,
            largura,
            titulo,
            zIndex,
            ID
        ]

        conexao.query(`UPDATE postagem SET baixo = ?, cima = ?, descricao = ?, direita = ?, esquerda = ?, largura = ?, titulo = ?, zIndex = ? WHERE ID = ?`, valores, (req, res) => {
            return resultado.json();
        });
    })

}

module.exports = listarArtes;