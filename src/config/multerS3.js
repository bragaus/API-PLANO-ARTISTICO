const crypto = require('crypto');
const aws = require('aws-sdk');
const multer = require('multer');
const multerS3 = require('multer-s3');

module.exports=(multer({

    // Como vai ser feito o armazenamento de arquivos:
    storage: multerS3({

        s3: new aws.S3(),
        bucket: 'planoart',
        contentType: multerS3.AUTO_CONTENT_TYPE,

        acl: 'public-read',

        // Nome da Imagem
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

       // Formatos aceitos:
       fileFilter: (req, file, cb) => {

            const isAccepted = ['image/png', 'image/jpg', 'image/jpeg'].find(formatoAceito => {
                formatoAceito == file.mimetype
            });

            // Formato aceito:
            if (isAccepted) {

                return cb(null, true);
            }

            // Formato inválido:
            return cb(null, false);
        }        

    }),
}));