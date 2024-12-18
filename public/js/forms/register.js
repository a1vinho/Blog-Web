(function() {
    const loading = document.querySelector('.loading');
    const sessions = document.querySelector('.container-sessions');
    const presentation = document.querySelector('.container-presentation');

    function continue_register() {
        loading.style.display = 'block';
        setTimeout(() => {
            sessions.style.display = 'flex';
            presentation.style.display = 'none';
        },2000);
        document.getElementById('continue').style.display = 'none';
        localStorage.presentation = 'true';
    };
    window.addEventListener('load',function() {
        if (this.localStorage.presentation === 'true') {
            sessions.style.display = 'flex';
            presentation.style.display = 'none';
        };
    });
})();

(function() {
    const btns = document.querySelectorAll('.btn');
    const keys = ['email','username','password'];

    return function() {
        let contador = -1;
        GetSessions().then(response => {
            if (response.email && !response.username) {
                btns[0].classList.remove('hidden');
            }
            if (response.username && !response.password) {
                btns[1].classList.remove('hidden');
            }
        });
    }();
})();

(function() {
    const next_register = document.getElementById('next-register');
    const container_session = document.querySelector('.container-sessions');
    const loading = document.querySelector('.loading_next_register');

    if (next_register) {
        
        next_register.addEventListener('click',async function() {

            container_session.classList.remove('hidden');
            container_session.style.display = 'none';
            loading.classList.remove('hidden');
            const data = await fetch('http://localhost/complete/register',{
                headers: {"Content-Type": "application/json"},
                method: "POST",
            });
            if (data.redirected) {
                setTimeout(() => {
                    window.location.href = data.url;
                },3000);
                return;
            };
            const Json = await data.json();
            console.log(Json);
        });
    };
})();
