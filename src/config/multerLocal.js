const multer = require('multer');
const path = require('path');

// Vamos exportar nosso módulo multer, executando com as nossas configurações em um objeto.
module.exports = (multer({

    // Como vai ser feito o armazenamento de aruqivos:
    storage: multer.diskStorage({

        // Destino do arquivo:
        destination: (req, file, cb) => {

            // setando o destino como segundo paramêtro do callback
            cb(null, path.resolve(__dirname, '..', '..', 'images'));
        },

        // Como os arquivos vão ser chamados:
        filename: (req, file, cb) => {

            // Setando o nome do arquivo que vai ser salvado no segundo paramêtro
            // Apenas concatenei a data atual como o nome original do arquivo, que a biblioteca nos disponibiliza.
            cb(null, Date.now().toString() + '-' + file.originalname);

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