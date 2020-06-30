/** Objeto com as configuração de funcionamento do multer */
const multer = require('multer');
const path = require('path');
const crypto = require('crypto');
/** yarn add aws-sdk */
const aws = require('aws-sdk');
/** yarn add multer-s3 */
const multerS3 = require('multer-s3');

const storageTypes = {
    /** storage do tipo local, para gravar os arquivos localmente */
    local: multer.diskStorage({

        /** essa função destination é praticamente a mesma coisa que a variavel dest */
        destination: (req, file, callBack) => {
            callBack(null, path.resolve(__dirname, '..', '..', 'tmp', 'uploads'))
        },

        filename: (req, file, callBack) => {
            /** criar um hash, uma quantidade de caracteres aleatorios 
             *  para anexar no inicio do nome da imagem para garantir 
             * que os nomes das imagens nunca se reptam 
            */
            crypto.randomBytes(16/** Tamanho do numero de bytes */, (err, hash) => {
                if (err) callBack(err);

                /** o HEX é basicamente para converter os bytes que foi gerado
                 * em hexadecimal
                 */
                file.key = `${hash.toString('hex')}-${file.originalname}`;
                callBack(null, file.key);
            });
        }
    }),

    /** storeage do tipo s3 */
    s3: multerS3({
        /** instancia da classe S3
         * o aws S3 lê automaticamente as variaveis do arquivo .ENV */
        s3: new aws.S3(),
        bucket: 'planoart',
        /** 
         * vai lê o tipo do arquivo que é enviado no upload
         * e vai atribuir como contentType daquele arquivo
         * para que o navegador entenda que ele pode abrir o aquivo em tela 
         * ao inves de forçar o download
         */
        contentType: multerS3.AUTO_CONTENT_TYPE,
        /** permissão, para que todo mundo consiga ler os arquivos */
        acl: 'public-read',
        /** nome da imagem que vai ser gravada no S3 */
        key: (req, file, callBack) => {
            /** criar um hash, uma quantidade de caracteres aleatorios 
             *  para anexar no inicio do nome da imagem para garantir 
             * que os nomes das imagens nunca se reptam 
            */
            crypto.randomBytes(16/** Tamanho do numero de bytes */, (err, hash) => {
                if (err) callBack(err);

                /** o HEX é basicamente para converter os bytes que foi gerado
                 * em hexadecimal
                 */
                const fileName = `${hash.toString('hex')}-${file.originalname}`;
                callBack(null, fileName);
            });
        },
    }),
}

module.exports = {
    /** destino dos arquivos quando for feito os uploads 
     * serve como se fosse um callBack
     * se não tiver nada em destination
     * sera usado essa variavel
    */
    dest: path.resolve(__dirname, '..', '..', 'tmp', 'uploads'),

    storage: storageTypes[process.env.STORAGE_TYPE],

    /** determinar limites para o arquivo */
    // limits: {
    //     fileSize: 3 * 1024 * 1024 /** Converter em MegaBytes */
    // },

    /** filtrar o upload de arquivos
     * por exemplo: filtrar quais extensões são aceitas
     * 
     * o fileFilter e outras funções do multer recebe 3 parametros
     * req: requisão, pode pegar cabeçalho, outros campos do body da req
     * file: arquivo, pode pegar o nome do arquivo, tipo do arquivo
     * callBack: é uma função que é chamada assim que termina a verificação
     * 
    */
    fileFilter: (req, file, callBack) => {
        const allowedMimes = [
            'image/jpeg',
            'image/pjpeg',
            'image/png',
            'image/gif'
        ];

        if (allowedMimes.includes(file.mimetype)) {
            callBack(null, true);
        } else {
            callBack(new Error('Entra com a porra do arquivo certo caralho )))(((((((--+)**'));
        };
    },
};

/** OBSSSSSSSS
 * __dirname se refere a pasta atual
*/

/**
* OBSSSSSSSSSSSSSSSS
* o callBack é uma forma antiga de lidar com programação assincrona
* que ainda é utilizada pelo multer
*/