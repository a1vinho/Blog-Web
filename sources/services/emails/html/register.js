export default function (token) {
    return `
        <!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Código de Verificação</title>
</head>
<body style="font-family: Arial, sans-serif; margin: 0; padding: 0; background-color: #f4f4f4;">
    <div style="max-width: 600px; margin: 20px auto; background: #ffffff; border-radius: 10px; box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1); overflow: hidden;">
        <!-- Cabeçalho -->
        <div style="background: #1e3a8a; color: #ffffff; padding: 20px; text-align: center;">
            <h1 style="margin: 0; font-size: 24px;">Verifique seu Email</h1>
        </div>

        <!-- Corpo do Email -->
        <div style="padding: 20px;">
            <p style="font-size: 16px; color: #333;">Olá,</p>
            <p style="font-size: 16px; color: #333;">Você solicitou um código de verificação para acessar sua conta. Use o código abaixo:</p>

            <!-- Código de Verificação -->
            <div style="text-align: center; margin: 20px 0;">
               <a href="http://localhost/email/confirmation?token=${token}" style="text-decoretion:none;">
                    <button style="background-color:#020617; color:white; padding:10px; border-radius:10px; width:180px; border:1px solid white; cursor:pointer;"> 
                        Confirma Email 
                    </button>
               </a>
            </div>

            <p style="font-size: 16px; color: #333;">Se você não solicitou este código, ignore este email. Este código expira em 15 minutos.</p>
        </div>

        <!-- Rodapé -->
        <div style="background: #f4f4f4; text-align: center; padding: 15px; font-size: 14px; color: #666;">
            <p style="margin: 0;">© 2024 Tudos e Todos. Todos os direitos reservados.</p>
        </div>
    </div>
</body>
</html>

    
    `
};