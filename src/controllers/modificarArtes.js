const conexao = require('../models/conexao');

async function listarArtes(req, resultado) {
    const artes = req.body
    
    artes.forEach(arte => {

        const {
            direita,
            esquerda,
            cima,
            baixo,
            largura,
            zIndex,
            ID
        } = arte

        conexao.query(`UPDATE postagem SET esquerda = ${esquerda}, direita = ${direita}, cima = ${cima}, baixo = ${baixo}, largura = ${largura}, zIndex = ${zIndex} WHERE ID = ${ID}`, (req, res) => {
            console.log(res);
        })
    })

}

module.exports = listarArtes;