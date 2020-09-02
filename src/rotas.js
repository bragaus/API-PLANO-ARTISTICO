const { Router } = require('express');
const { celebrate, Segments, Joi } = require('celebrate');

const passport = require('passport');
const jwt = require('jsonwebtoken');

const multerS3 = require('./config/multerS3');
const multerLocal = require('./config/multerLocal');

const compressor = require('./utils/compressorDeImagens');

const router = Router();

const ArtworkController = require('./controllers/ArtworkController');
const artworkController = new ArtworkController();

const postarArte = require('./controllers/postarArte');
const deletarArte = require('./controllers/deletarArte');
const postarArteFrenteVerso = require('./controllers/postarArteFrenteVerso');
const listarArteUnica = require('./controllers/listarArteUnica');
const modificarArtes = require('./controllers/modificarArtes');

const {enviarEmail, enviarEmailAnexo} = require('./utils/enviadorDeEmail');


// Função para verificar autenticidade do token
function verificarToken(req, res, next) { 

    const verificarCabecalho = req.headers['authorization'];

    if (verificarCabecalho) {
        // recuperando token do cabeçalho da requisição
        const header = req.headers['authorization'];
        
        // separando o bearer do token e recuperando o token
        const bearer = header.split(' ');
        const token = bearer[1];

        jwt.verify(token, process.env.NODE_KEY, (err) => {

            if(err){
                res.status(403).send('token inválido');
            } else {
                console.log('postagem autorizada');
                next();
            }
        });

    } else {
        res.status(403).send('token inválido');
    }
}

// Rota para fazer o login
router.post('/login', function (req, res, next) {
    passport.authenticate('local', {session: false}, (err, user, info) => {
        
        if (err || !user) {
			console.log(err)
            return res.status(400).json({
                message: 'Something is not right',
                user: user
            });
        }

        req.login(user, {session: false}, (err) => {
            if (err) {
                res.send(err);
            }

            const payload = {
                id: user.ID,
                // expire: Date.now() + 1000 * 60 * 60 * 24 * 7, //7 days
            };            
                
            // Gerando o token
            // const token = jwt.sign(JSON.stringify(user.ID), process.env.NODE_KEY);
            const token = jwt.sign(JSON.stringify(payload), process.env.NODE_KEY);
            
            return res.json({user, token});
        });

    })(req, res, next);
});

// Rota para deletar arte
router.delete('/deletarArte/:id', verificarToken, deletarArte);

// Rota para modificar arte
router.post('/controlesDaArte', verificarToken, modificarArtes);

// Rota para retornar uma arte específica
router.get('/visualizarArte/:id', listarArteUnica);

// Rota para listar todas as artes do banco
router.get('/artworks', artworkController.index);

// Rota para postar arte individual
router.post('/postarArte',  

    multerS3.single('file'),

    (req, res, next) => {

        compressor.compressImage(req.file, 500)
        .then(arquivoBlob => {
            
            req.arquivoBlob = arquivoBlob
            next();
        });
        
    },

    celebrate({
        [Segments.BODY]: Joi.object().keys({
            titulo: Joi.string().allow(null, '').max(300),
            desc: Joi.string().allow(null, '').max(500),
            tipo: Joi.string().required()
        })
    }),

    // inserção no banco de dados
    postarArte
    
);

// Rota para postar arte com frente e verso
router.post('/postarArteFrenteVerso',

    verificarToken,

    multerS3.array('file', 3),

    (req, res, next) => {

        compressor.compressImage(req.files[2], 500)
        .then(arquivoBlob => {
            
            req.arquivoBlob = arquivoBlob
            next();
        });
        
    },    

    celebrate({
        [Segments.BODY]: Joi.object().keys({
            titulo: Joi.string().allow(null, '').max(300),
            desc: Joi.string().allow(null, '').max(500),
            tipo: Joi.string().required()
        })
    }), 

    postarArteFrenteVerso
);

// Rota para enviar email com anexo
router.post('/emailanexo',

    // upload
    multerLocal.single('file'),

    (req, res) => {
        
        const { path, originalname } = req.file

        const { email, corpo } = req.body

        enviarEmailAnexo(email, corpo, path, originalname, (erro, info) => {
            if (erro) {
                console.log('ERRO: ', erro);
                return res.status(500).json({ message: erro.message || 'Internal Error' });
            }

            return res.json(info);
        });
        
    }
);

// Rota para enviar email
router.post('/email',

    (req, res) => {

        const { email, corpo } = req.body

        enviarEmail(email, corpo, (erro, info) => {
            if (erro) {
                console.log('ERRO: ', erro);
                return res.status(500).json({ message: erro.message || 'Internal Error' });
            }
            
            return res.json(info);
        });
        
    }
);

module.exports = router;
