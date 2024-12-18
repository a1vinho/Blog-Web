(function() {
    const send_username = document.querySelector('.form-create-username');
    const username = document.getElementById('username');
    const text_response = document.querySelector('.text-response');
    const loading = document.querySelector('.loading');

    send_username.addEventListener('submit',async event => {
        event.preventDefault();
        text_response.classList.add('hidden');
        loading.style.display = 'block';
        const data = await fetch('http://localhost/register/username/',{
            headers: {"Content-Type":"application/json"},
            method: "POST",
            body: JSON.stringify({username:username.value})
        });
        if (data.redirected) {
            text_response.textContent = '';
            window.location.href = data.url;
            return;
        }
        const Json = await data.json();

        loading.style.display = 'none';
        text_response.classList.remove('hidden');
        text_response.textContent = Json.messagem;
    });
})();