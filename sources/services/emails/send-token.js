import nodemailer from "nodemailer";

export default function (email, token,html) {
    const transport = nodemailer.createTransport({
        service: "gmail",
        secure: false,
        auth: {
            user: process.env.email,
            pass: process.env.password
        }
    });
    return new Promise(function(resolve,reject) {
        transport.sendMail({
            from: process.env.email,
            to: email,
            subject: `Código de verificação - Tudos e Todos`,
            html:html(token)
        },function(err,info) {
            if (err) {
                console.log(`Erro no arquivo send-token.js`);
                console.log(err);
                return reject({messagem: "Erro ao envia código de verificação,tente novamente mais tarde.",status:501});
            };
            return resolve({messagem: "Email de verificação enviado com sucesso.",status:200});
        });
    });
};