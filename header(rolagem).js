const header = document.querySelector('.main-header');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 30) { // Quando o usuário rolar 50px para baixo
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });