import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

import mysql from "../../services/database/index.js";
import sendToken from "../../services/emails/send-token.js";
import register_html from "../../services/emails/html/register.js";
import isPassword from "../../utils/isPassword.js";

const users = {};

export default {
    async SendEmail (request,response) {
        const email = request.body.email;
        try {
            if (!email) {
                return response.status(400).json({messagem: "Você digitou um email invalído,tente novamente."});
            };
            const [exists] = (await mysql.query(`SELECT * FROM registros WHERE email = ?`,email)).find(data => data);
            if (exists) {
                return response.status(400).json({messagem: "Esse email já está registrado."});
            };
            const token = jwt.sign({email},process.env.SECRET);
            const data = await sendToken(email,token,register_html);

            return response.status(data.status).json({messagem: data.messagem});
        }
        catch (e) {
            console.log(e);
            return response.status(500).json({messagem: "Erro no servidor,tente novamente mais tarde."});
        }
    },
    async Username (request,response) {
        if (!request.session.email) {
            return response.status(401).json({messagem: "Primeiro adicione seu email por favor"});
        };
        const username = request.body.username;
        try {
            if (!username || username.length < 4) {
                return response.status(400).json({messagem: "Digite um nome de usuário valido por favor."});
            };
            if (username.length < 4) {
                return response.status(400).json({messagem: "Digite um nome de usuario maior ou igual a 4 caracteres."});
            };
            const [exists] = await mysql.query(`SELECT * FROM registros WHERE username = ?`,username);
            if (!exists) {
                return response.status(401).json({messagem: "Esse usuário já existe,tente outro por favor."});
            };
            request.session.username = username;
            return response.status(301).redirect('/register');
        }
        catch (e) {
            console.log(e);
            return response.status(500).json({messagem: "Erro no servidor,tente novamente mais tarde."});
        };
    },
    async Password(request,response) {
        if (!request.session.email && !request.session.username) {
            return response.status(401).json({messagem: "Adicione primeiro,seu nome de usuário e email por favor"});
        };
        const {password,password2} = request.body;
        try {
            if (!isPassword(password,password2)) {
                return response.status(400).json({ messagem: "Sua senha invalída,por favor siga as regras acima."});
            };
            const hash = await bcrypt.hash(password,12);
            request.session.password = hash;
            return response.status(301).redirect('/register');
        }
        catch (e) {
            console.log(e);
            return response.status(500).json({messagem: "Erro no servidor,tente novamente mais tarde."});
        };
    },
    async CompleteRegister(request,response) {
        const { email, username, password } = request.session;
        if (!email || !username || !password) {
            return response.status(401).json({ messagem: "Adicione primeiro suas credenciais nas sessões." });
        };
        const [exists] = (await mysql.query(`SELECT * FROM registros WHERE email = ? OR username = ?`, [
            email,
            username
        ])).find(data => data);
        if (!exists) {
            const [{ insertId }] = await mysql.query(`INSERT INTO registros (email,username,password) VALUES (?,?,?)`, [email, username, password]);
            request.session.cookies = jwt.sign({ id: insertId, username },process.env.SECRET);
    
            request.session.email = undefined;
            request.session.password = undefined;
            request.session.username = undefined;
            request.session.token = undefined;
    
            return response.status(301).redirect('/');
        };
        return response.status(401).json({ messagem: "Esse usuário já tem uma conta criada." });
    },
    async Login (request,response) {
        try {
            const {email,password} = request.body;
            if (!email || !password) {
                return response.status(400).json({messagem: "Suas credenciais estão invalídas."});
            };
            const [exists] = (await mysql.query(`SELECT * FROM registros WHERE email = ?`,email)).find(data => data);
            if (exists) {
                if (exists.email === email && await bcrypt.compare(password,exists.password)) {
                    request.session.login = jwt.sign({id:exists.id,username:exists.username},process.env.SECRET);
                    return response.status(301).redirect('/');
                };
                return response.status(401).json({messagem: "Senha incorreta."});
            };
            return response.status(404).json({messagem: "Usuário não encontrado."});
        }
        catch (e) {
            console.log(`Ocorreu um erro no arquivo de login `);
            console.log(e);
            return response.status(500).json({messagem: "Erro no servidor,tente novamente mais tarde."});
        }
    }
};