document.getElementById('whatsappForm').addEventListener('submit', function(event) {
    event.preventDefault(); // Impede o envio do formulário tradicional

    // 1. Coleta os valores dos campos
    const name = document.getElementById('name').value;
    const phone = document.getElementById('phone').value;
    const message = document.getElementById('message').value;

    // 2. Monta a mensagem para o WhatsApp
    const whatsappMessage = `Olá, Dra. Camila!%0A%0A
    Meu nome é: ${name}%0A
    Meu telefone é: ${phone}%0A%0A
    Mensagem:%0A
    ${message}%0A%0A
    Gostaria de agendar uma consulta.`;

    // 3. Substitua o número abaixo pelo número da Camila
    const whatsappNumber = '5561998817667'; // Exemplo: 55 + código de área + número

    // 4. Cria o link para o WhatsApp
    const whatsappLink = `https://api.whatsapp.com/send?phone=${whatsappNumber}&text=${whatsappMessage}`;

    // 5. Abre o link em uma nova aba
    window.open(whatsappLink, '_blank');
});

document.querySelectorAll('.button').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();

        const targetId = this.getAttribute('href');
        const targetElement = document.querySelector(targetId);
        
        if (targetElement) {
            targetElement.scrollIntoView({
                behavior: 'smooth'
            });
        }
    });
});


// troca de avaliação
document.addEventListener('DOMContentLoaded', () => {
    const avaliacaoGroups = document.querySelectorAll('.avaliacao-group');
    let currentIndex = 0;

    function showNextGroup() {
        // Esconde o grupo atual
        avaliacaoGroups[currentIndex].classList.remove('active');

        // Calcula o índice do próximo grupo, voltando ao início se necessário
        currentIndex = (currentIndex + 1) % avaliacaoGroups.length;

        // Mostra o próximo grupo
        avaliacaoGroups[currentIndex].classList.add('active');
    }

    // Define o intervalo para a troca de avaliações a cada 1 minuto (60000ms)
    setInterval(showNextGroup,10000);
});

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCoxGcEOlyWZxuMpP4pv1JzyHoWOfsJrO8",
  authDomain: "site-camilaoliveira.firebaseapp.com",
  projectId: "site-camilaoliveira",
  storageBucket: "site-camilaoliveira.firebasestorage.app",
  messagingSenderId: "1050196958342",
  appId: "1:1050196958342:web:8f00851b94d791a6cd0507",
  measurementId: "G-5N1FPQFXQV"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);