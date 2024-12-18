import { config } from "dotenv";
config();
export default {
    host: process.env.HOST,
    port:process.env.PORTDB,
    user:process.env.USERDB,
    password: process.env.PASSWORDDB,
    database: process.env.DATABASE
};