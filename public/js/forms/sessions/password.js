(function () {
    const form_password = document.querySelector('.form-create-password');
    const inputs = form_password.querySelectorAll('input');
    const loading = document.querySelector('.loading');
    const text_response = document.querySelector('.text-response');

    form_password.addEventListener('submit', async event => {
        event.preventDefault();
        loading.style.display = 'block';
        text_response.style.display = 'none';

        const data = await fetch('http://localhost/register/password', {
            headers: { "Content-Type": "application/json" },
            method: "POST",
            body: JSON.stringify({
                password: inputs[0].value,
                password2: inputs[1].value
            })
        });
        if (data.redirected) {
            text_response.style.display = 'none';
            return window.location.href = data.url;
        };
        const Json = await data.json();

        loading.style.display = 'none';
        text_response.style.display = 'block';
        text_response.textContent = Json.messagem;
    });

    const eye = document.querySelector('.eye');
    const eye_off = document.querySelector('.eye-off');

    eye.addEventListener('click', function () {
        
        eye.classList.toggle('hidden');
        eye_off.classList.toggle('hidden');
        
        inputs.forEach(input => input.type = 'text');
    });
    eye_off.addEventListener('click', function () {
        eye_off.classList.toggle('hidden');
        eye.classList.toggle('hidden');
        inputs.forEach(input => input.type = 'password');
    });
})();