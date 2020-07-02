const bcrypt = require('bcrypt');
const EstrategiaLocal = require('passport-local').Strategy;
const conexao = require('./models/conexao');
const passportJWT = require("passport-jwt");
const JWTStrategy   = passportJWT.Strategy;
const ExtractJWT = passportJWT.ExtractJwt;

module.exports = function(passport) {

	function validarLogin(nome, senha, done) {
	
		// Consulta para retornar os dados de acordo com o nome enviado no login
		conexao.query('SELECT * FROM Login WHERE nome = ?', [nome], (erro, resultado) => {

			if(erro) {
				return done(erro)
			};

			// se não foi encontrado nenhum usuario
			if(resultado.length == 0) {	
				return done(null, false)
			}

			// comparação da senha enviada no login com o hash que ta no banco de dados
			bcrypt.compare(senha, resultado[0].senha, (erro, senhaValida) => {
				
				if(erro) {
					return done(erro)
				};

				// Senha Inválida
				if(!senhaValida) {
					console.log('senha invalida')
					return done(null, false)
				};

				// Senha válida
				console.log('senha correta')
				return done(null, resultado[0])

			});
		});
	};

	passport.use('local', new EstrategiaLocal({ 
			usernameField: 'nome', 
			passwordField: 'senha'
		}, 
		validarLogin
	)); 

	// Retornar os dados do usuário de acordo com o ID do usuário guardado no token
	passport.use(new JWTStrategy({
        jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
        secretOrKey: process.env.NODE_KEY
    },
    function (jwtPayload, cb) {
		conexao.query('SELECT * FROM Login WHERE ID = ?', [jwtPayload.id], (erro, usuario) => {
			return cb(null, usuario);
		})
	}
	
));	
		
 };
