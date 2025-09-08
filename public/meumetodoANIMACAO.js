    /*animação  acompanhamento nutricional*/
 // Seleciona todos os elementos com a classe 'cartao-info'
  const elementosParaAnimar = document.querySelectorAll('.pilar-card');

  // Adiciona a classe 'oculto' a todos os elementos para que eles comecem invisíveis
  elementosParaAnimar.forEach(elemento => {
    elemento.classList.add('oculto');
  });

  // Cria o observador de interseção
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      // Se o elemento estiver na tela, adicione a classe 'surgir'
      if (entry.isIntersecting) {
        entry.target.classList.add('surgir');
      } else {
        // Se o elemento não estiver na tela, remova a classe 'surgir'
        entry.target.classList.remove('surgir');
      }
    });
  }, {
    threshold: 0.5 // Aciona o evento quando 50% do elemento está visível
  });

  // Observa cada elemento
  elementosParaAnimar.forEach(elemento => {
    observer.observe(elemento);
  });

  