
(() => {
    const send_email = document.querySelector('.form-send-email');
    const loading = document.querySelector('.loading');
    const text_response = document.querySelector('.text-response');
    const submit = document.querySelector('.submit');

    send_email.addEventListener('submit',async event => {
        event.preventDefault();
        
        try {
            text_response.style.display = 'none';
            loading.style.display = 'block';
            const data = await fetch('http://localhost/send/email/register',{
                headers: {"Content-Type": "application/json"},
                method: "POST",
                body: JSON.stringify({email:document.getElementById('email').value})
            });
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