export default {
    Home (request,response) {
        return response.status(200).render('index',{
            title: "Página Principal",
            css: `http://192.168.1.74//css/index.css`,
            session:request.session.login
        });
    },
    Login(request,response) {
        return response.status(200).render('forms/login',{
            title: "Login usuário",
            css: `http://192.168.1.74//css/forms/login.css`,
            js: `http://192.168.1.74//js/forms/login.js`,
            endpoint: "login",
            text: "Área de login"
        });
    },
    Register(request,response) {
        return response.status(200).render('forms/register',{
            title: "Registro usuário",
            css: `http://192.168.1.74//css/forms/register.css`,
            js: `http://192.168.1.74//js/forms/register.js`,
            endpoint: 'register',
            sessions:request.session,
            next: request.session.email && request.session.username && request.session.password,
            text: "Área de registro"
        });
    },
    Sessions: {
        Email (request,response) {
            return response.status(200).render('forms/sessions-register/email',{
                title: "Página de registro - Email",
                js : `http://192.168.1.74//js/forms/sessions/email.js`,
                endpoint: 'register',
                email: request.session.email,
                text: "Aréa de registro - email"
            });
        },
        Username (request,response,next) {
            if (!request.session.email) {
                return next();
            };
            return response.status(200).render('forms/sessions-register/username',{
                title: "Página de registro - Username",
                endpoint: "register",
                js:`http://192.168.1.74//js/forms/sessions/username.js`,
                text: 'Àrea de registro - Nome de usuário'
            });
        },
        Password (request,response,next) {

            return response.status(200).render("forms/sessions-register/password",{
                title: "Página de registro - Crianção de senha",
                endpoint: "register",
                js: `http://192.168.1.74//js/forms/sessions/password.js`,
                text: "Área de registro - password"
            });
        }
    }
};