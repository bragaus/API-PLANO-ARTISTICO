const nodemailer = require('nodemailer');
const { CodeBuild } = require('aws-sdk');

const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 587,
    secure: false,
    auth: {
        user: process.env.MENSAGEIRO_ORIGEM_EMAIL,
        // pass: process.env.MENSAGEIRO_SENHA,
        pass: 1
    }
});

const enviarEmail = (titulo, corpo, retornar) => {
    const mailOptions = {
        from: process.env.MENSAGEIRO_ORIGEM_EMAIL,
        // to: process.env.MENSAGEIRO_DESTINO_EMAIL,
        to: 'mannoplay@gmail.com',
        subject: titulo,
        text: corpo
    };

    // Função que, efetivamente, envia o email.
    transporter.sendMail(mailOptions, (erro, info) => {
        if (erro) {
            return retornar(erro, null)
        }
    
        return retornar(null, info)
    });    
};

module.exports = enviarEmail;