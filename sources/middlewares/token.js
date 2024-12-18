import jwt from "jsonwebtoken";
import mysql from "../services/database/index.js";

export default async function (request,response,next) {
    const token = request.headers["Authorization"] || request.query.token;
    if (!token) {
        request.session.error = {
            messagem: "Erro ao valida sua sessão,tente novamente mais tarde.",
            status:401
        };
        return response.status(301).redirect("/");
    };
    const [exists] = (await mysql.query(`SELECT * FROM Tokens WHERE token = ?`,token)).find(data => data);
    console.log(exists);
    if (exists) {
        request.session.error = {
            messagem: "Seu token de sessão já está invalido,tente reenviar o formulário ou se logar novamente",
            status:401
        };
        return response.status(301).redirect('/');
    };
    if (token.split('.').length !== 3) {
        request.session.error = {
            messagem: "Erro ao valida sua sessão,tente novamente mais tarde.",
            status:401
        };
        return response.status(301).redirect("/");
    };
    jwt.verify(token,process.env.SECRET,function(err,data) {
        if (err) {
            console.log(err);
            request.session.error = {
                messagem: "Erro ao valida sua sessão,tente novamente mais tarde.",
                status:401
            };
            return;
        };
        request.user = data;
        request.session.token = token;
        next();
    });
};