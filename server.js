import server from "./sources/configs/config.js";

const PORT = process.env.PORT || 8081;

server.listen(PORT,() => console.log(`Server Running ${PORT}`));