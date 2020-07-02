const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 587,
    secure: false,
    auth: {
        user: process.env.MENSAGEIRO_ORIGEM_EMAIL,
        pass: process.env.MENSAGEIRO_SENHA,
    }
});

const enviarEmail = (titulo, corpo, retornar) => {
    const mailOptions = {
        from: process.env.MENSAGEIRO_ORIGEM_EMAIL,
        to: `${process.env.MENSAGEIRO_DESTINO_EMAIL}, ${process.env.MENSAGEIRO_DESTINO_EMAIL_COPIA}`,
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