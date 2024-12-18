(function() {
    const loading = document.querySelector('.loading');
    const text_response = document.querySelector('.text-response');

    document.getElementById('form_login').addEventListener('submit',async function(event) {
        const inputs = this.querySelectorAll('input');
        event.preventDefault();
        try {
            loading.style.display = 'block';
            text_response.style.display = 'none';

            const data = await fetch('http://192.168.1.74/login',{
                headers: {"Content-Type": "application/json"},
                method: "POST",
                body: JSON.stringify({
                    email: inputs[0].value,
                    password: inputs[1].value
                })
            });
            if (data.redirected) {
                return window.location.href = data.url;
            };
            const Json = await data.json();
            loading.style.display = 'none';
            text_response.style.display = 'block';

            text_response.textContent = Json.messagem;

        }
        catch (e) {
            console.log(e);
        };
    });
})();
(function(){
    const eye = document.querySelector(".eye");
    const eye_off = document.querySelector('.eye-off');
    const password = document.getElementById('password');
    eye.addEventListener('click',function() {
        eye.classList.toggle('hidden');
        eye_off.classList.toggle('hidden');
        password.type = 'text';
    });
    eye_off.addEventListener('click',function() {
        eye.classList.toggle('hidden');
        eye_off.classList.toggle('hidden');

        password.type = 'password';
    });
})(); 