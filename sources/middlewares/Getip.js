import fs from "fs";

export default async function (req,response,next) {
    const ip = req.connection.remoteAddress || req.socket.remoteAddress || req.connection.socket.remoteAddress;
    
    const log = `${new Date().toISOString()} - IP: ${ip}\n`;
    console.log(log);

    fs.appendFile('access_logs.txt', log, (err) => {
        if (err) console.error('Erro ao salvar o log:', err);
    });

    next();
};