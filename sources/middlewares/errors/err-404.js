export default function (request,response) {
    return response.status(404).render('errors/404',{
        title: "Página não encontrada",
        js: `http://192.168.1.74/js/errors/404.js`
    });
};