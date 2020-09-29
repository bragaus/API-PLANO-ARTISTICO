const conexao = require('../models/conexao');
const deletarArteDoCDN = require('../utils/deletarArteDoCDN');
const PrepararEnvio = require('../utils/prepararEnvio');

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

    post(req, resultado) {
    
        const { titulo, desc: descricao, tipo } = req.body;
    
        const { 
            originalname: nomeOriginal, 
            location: url, 
            key: chave, 
            size: tamanhoArquivo 
        } = req.file;
    
        const blobPreview = req.blobPreview;
    
        const valores = [
            [titulo, nomeOriginal, chave, descricao, tipo, url, tamanhoArquivo, blobPreview]
        ];
    
        conexao.query(`INSERT INTO postagem(titulo, nomeOriginal, chave, descricao, tipo, url, tamanhoArquivo, blobPreview) VALUES (?)`, valores, (req, res) => {
            return resultado.json();
        });

    }
    
    posts(req, resultado) {

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
    
        const blobPreview = req.blobPreview;
        const blobFrente = req.blobFrente;
        const blobVerso = req.blobVerso;
    
        const valores = [[
            titulo, nomeOriginal, chave, chaveArteFrente, chaveArteVerso,
            descricao, tipo, urlPreview, urlFrente, urlVerso, tamanhoArquivo,
            blobPreview, blobFrente, blobVerso
        ]]
    
        conexao.query(`INSERT INTO postagem(titulo, nomeOriginal, chave, chaveArteFrente, chaveArteVerso, descricao, tipo, urlPreview, urlFrente, urlVerso, tamanhoArquivo, blobPreview, blobFrente, blobVerso) VALUES (?)`, valores, (req, res) => {
            return resultado.json();
        }); 
    };    

    upadte(req, resposta) {
        const artes = req.body
    
        artes.forEach(arte => {
    
            const { baixo, cima, descricao, direita, esquerda, largura,
                titulo, zIndex, ID
            } = arte
    
            let valores = [ baixo, cima, descricao, direita, esquerda,
                largura, titulo, zIndex, ID
            ]
    
            conexao.query(`UPDATE postagem SET baixo = ?, cima = ?, descricao = ?, direita = ?, esquerda = ?, largura = ?, titulo = ?, zIndex = ? WHERE ID = ?`, valores, (req, res) => {
                return resposta.json();
            });

        });        
    }

    delete({ params: {id} }, resposta) {
        deletarArteDoCDN(id)    
        conexao.query('DELETE FROM postagem WHERE ID = ?', id, (req, res) => {      
            return resposta.json(res)
        });     
    }

}

module.exports = ArtworkController;