import express from "express";
import exphbs from "express-handlebars";
import session from "express-session";
import dotenv from "dotenv";
import MySQLStore from "express-mysql-session";
import cors from "cors";

import pages from "../routers/pages/pages.js";
import Actions from "../routers/actions/actions.js";
import configStore from "./config-store-sessions.js";
import Mid404 from "../middlewares/errors/err-404.js";
import Getip from "../middlewares/Getip.js";

dotenv.config();
const app = express();
const hbs = exphbs.create({
    helpers: {
       
        compare: function(endpoint) {
            return (endpoint === "login") || (endpoint === "register");
        },
        and (a,b) {
            return a && b;
        }
    }
});

const sessionStore = MySQLStore(session);
const store = new sessionStore(configStore);

app.use(session({
    secret: process.env.SECRET,
    resave:false,
    saveUninitialized:false,
    store:store,
    cookie: {
        secure:false,
        httpOnly:true,
        sameSite: 'lax',
        maxAge: 1000 * 60 * 60 * 24
    }
}));
app.disable('x-powered-by');
app.use(Getip);

app.use(express.json());
app.use(express.urlencoded({extended:true}));

app.engine('handlebars',hbs.engine);
app.set('view engine','handlebars');

app.use(cors());
app.use(express.static('./public'));

app.use(pages);
app.use(Actions);
app.use(Mid404);

export default app;