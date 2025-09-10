 document.getElementById('whatsappForm').addEventListener('submit', function(event) {
        // Previne o envio padrão do formulário
        event.preventDefault();

        // Número de telefone para o WhatsApp
        const numeroTelefone = '5561998817667'; // Insira o número da Dra. Camila com o código do país (55) e o DDD (11)

        // Mensagem a ser enviada
        const mensagem = 'Olá, Dra. Camila, gostaria de agendar uma consulta.';

        // Formata a URL do WhatsApp
        const urlWhatsApp = `https://wa.me/${numeroTelefone}?text=${encodeURIComponent(mensagem)}`;

        // Abre a nova aba
        window.open(urlWhatsApp, '_blank');
    });
