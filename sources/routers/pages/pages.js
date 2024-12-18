import { Router } from "express";

import pages from "../../controllers/get/pages/pages.js";
import Mid404 from "../../middlewares/errors/err-404.js";

const router = Router();

router.get('/',pages.Home);
router.get('/login',pages.Login);
router.get('/register',pages.Register);
router.get('/register/email',pages.Sessions.Email);
router.get('/register/username',pages.Sessions.Username,Mid404);
router.get('/register/password',pages.Sessions.Password,Mid404);



export default router;