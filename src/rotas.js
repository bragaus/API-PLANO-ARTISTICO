const { Router } = require('express');
const { celebrate, Segments, Joi } = require('celebrate');
const passport = require('passport');
const jwt = require('jsonwebtoken');
const multer = require('multer');
const multerConfig = require('./config/multer');
const router = Router();

const postarArte = require('./controllers/postarArte');
const deletarArte = require('./controllers/deletarArte');
const postarArteFrenteVerso = require('./controllers/postarArteFrenteVerso');
const listarArteUnica = require('./controllers/listarArteUnica');
const listarIlustracoes = require('./controllers/listarIlustracoes');
const listarArteDeCapa = require('./controllers/listarArteDeCapa');
const listarColagens = require('./controllers/listarColagens');
const modificarArtes = require('./controllers/modificarArtes');
const enviarEmail = require('./utils/enviadorDeEmail');

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
           // Gerando o token
           const token = jwt.sign(JSON.stringify(user.ID), process.env.NODE_KEY);
           return res.json({user, token});
        });
        
    })(req, res, next);
});

// Rota para deletar arte
router.delete('/deletarArte/:id', verificarToken, deletarArte);

// Rota para modificar arte
router.post('/controlesDaArte', verificarToken, modificarArtes);

// Rota para retornar uma arte específica
router.get('/visualizarArte/:id', listarArteUnica)

// Rota para retornar as artes de cada seção
router.get('/ilustracao', listarIlustracoes);
router.get('/arteDeCapa', listarArteDeCapa);
router.get('/colagem', listarColagens);

// Rota para postar arte individual
router.post('/postarArte',

    verificarToken,

    // upload
    multer(multerConfig).single('file'),

    // validação de dados
    celebrate({
        [Segments.BODY]: Joi.object().keys({
            titulo: Joi.string().required().max(30),
            desc: Joi.string().required().max(500),
            tipo: Joi.string().required()
        })
    }),    

    // inserção no banco de dados
    postarArte
    
);

// Rota para postar arte com frente e verso
router.post('/postarArteFrenteVerso',

    verificarToken,

    multer(multerConfig).array('file', 3),

    celebrate({
        [Segments.BODY]: Joi.object().keys({
            titulo: Joi.string().required(),
            desc: Joi.string().required(),
            tipo: Joi.string().required()
        })
    }), 

    postarArteFrenteVerso
);

// Rota para enviar email
router.post('/email',

    // upload
    multer(multerConfig).single('file'),

    (req, res) => {

        const { path, originalname } = req.file
        const { email, corpo } = req.body

        enviarEmail(email, corpo, path, originalname, (erro, info) => {
            if (erro) {
                console.log('ERRO: ', erro);
                return res.status(500).json({ message: erro.message || 'Internal Error' });
            }

            console.log(info)
            return res.json(info);
        });
        
    }
);

module.exports = router;
