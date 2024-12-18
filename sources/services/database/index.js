import mysql from "mysql2/promise.js";
import { config } from "dotenv";
config();

export default mysql.createPool({
    host: process.env.HOST,
    user: process.env.USERDB,
    password: process.env.PASSWORDDB,
    database: process.env.DATABASE,
    connectionLimit:10
});