import { Router } from "express";
import jwt from "jsonwebtoken";

import Post from "../../controllers/posts/actions-post.js";
import mysql from "../../services/database/index.js"
import Token from "../../middlewares/token.js";
import rateLimit from "../../utils/rateLimit.js";

const router = Router();

router.get('/email/confirmation', Token, async function (request, response) {
    const email = request.user.email;
    request.session.email = email;

    await mysql.query(`INSERT INTO Tokens (token) VALUES (?)`, request.session.token);
    return response.status(301).redirect('/register');
});
router.get('/sessions', function (request, response) {
    return response.status(200).json(request.session);
});

router.post('/complete/register',Post.CompleteRegister);
router.post('/login',rateLimit,Post.Login);

router.post('/send/email/register',rateLimit,Post.SendEmail);
router.post('/register/username', Post.Username);
router.post('/register/password', Post.Password);

export default router;