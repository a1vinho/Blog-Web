export default function (request, response, next) {
    const now = Date.now();
    const time = now - request.session.wait;
    if (!request.session.cont) {
        request.session.cont = 0;
    };
    console.log(time);
    if (request.session.wait && time >= 10000) {
        console.log(time)
        request.session.cont = 0;
    };
    request.session.wait = now;
    if (request.session.cont === 3) {
        return response.status(429).json({messagem: "Por favor aguarde um momento..."})
    };
    request.session.cont++;
    next();
};