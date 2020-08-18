const fs = require('fs'), sharp = require('sharp');
const https = require('https');
const path = require('path');

exports.compressImage = (file, size) => {

    const caminho = path.resolve(__dirname, '..', '..', 'images', file.key);

    // const newPath = caminho.split('.')[0] + '.webp';

    const arquivo = fs.createWriteStream(caminho);

    https.get(file.location, function(response) {
        response.pipe(arquivo)
        arquivo.on('finish', () => {
            return sharp(caminho) // Executa o SHARP na imagem que será comprimida
            .resize(size) // Redimensa para o tamanho solicitado
            .toFormat('webp') // Forçando a conversão do arquivo para webp
            .webp({ quality: 80 }) // Setando uma qualidade
            .toBuffer() // Transformando o arquivo em buffer
            .then( data => { // data = arquivo tratado
                
                // Deletando o arquivo antigo:
                // O fs.access serve para testar se o arquivo realmente existe.
                fs.access(caminho, (err) => {
    
                    // Um erro significa que o arquivo não existe
                    if (!err) {
                        
                        // Se não houver erros o arquivo vai ser deletado.
                        fs.unlink(caminho, (err) => {
                            if(err) console.log(err)
                        })
    
                    }
     
                });
    
                // Função para criar o arquivo em um diretorio:
                // fs.writeFile(newPath, data, (err) => {
                //     if (err) throw err;
                // });
    
                const arquivoBase64 = new Buffer.from(data).toString('base64');
                return arquivoBase64

                // retornando novo caminho
                // return newPath;
    
            })            
        })
    });

}