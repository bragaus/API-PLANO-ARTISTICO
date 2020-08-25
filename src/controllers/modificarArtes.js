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

        console.log(valores);
        // `UPDATE postagem SET baixo = ${baixo}, cima = ${cima}, descricao = ${descricao}, direita = ${direita}, esquerda = ${esquerda}, largura = ${largura}, titulo = ${titulo}, zIndex = ${zIndex} WHERE ID = ${ID}`

        // const {
        //     direita,
        //     esquerda,
        //     cima,
        //     baixo,
        //     largura,
        //     zIndex,
        //     ID
        // } = arte

        conexao.query(`UPDATE postagem SET baixo = ?, cima = ?, descricao = ?, direita = ?, esquerda = ?, largura = ?, titulo = ?, zIndex = ? WHERE ID = ?`, valores, (req, res) => {
            console.log(res);
            return resultado.json();
        });  

        // conexao.query(`UPDATE postagem SET esquerda = ${esquerda}, direita = ${direita}, cima = ${cima}, baixo = ${baixo}, largura = ${largura}, zIndex = ${zIndex} WHERE ID = ${ID}`, (req, res) => {
        //     return resultado.json();
        //     console.log(res);
        // })
    })

}

module.exports = listarArtes;