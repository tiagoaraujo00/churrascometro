document.addEventListener('DOMContentLoaded', function () {
  const contactForm = document.getElementById('contactForm');

  // Carregar dados do localStorage, se disponíveis
  const storedData = JSON.parse(localStorage.getItem('formData')) || {};
  document.getElementById('name').value = storedData.name || '';
  document.getElementById('email').value = storedData.email || '';
  document.getElementById('cep').value = storedData.cep || '';
  document.getElementById('consent').checked = storedData.consent || true;

  contactForm.addEventListener('submit', function (event) {
      event.preventDefault();

      // Obter valores do formulário
      const name = document.getElementById('name').value;
      const email = document.getElementById('email').value;
      const cep = document.getElementById('cep').value;
      const consent = document.getElementById('consent').checked;

      // Validar os campos
      if (!name || !email || !cep || !isValidEmail(email)) {
          alert('Por favor, preencha todos os campos corretamente.');
          return;
      }

      // Armazenar dados no localStorage
      const formData = { name, email, cep, consent };
      localStorage.setItem('formData', JSON.stringify(formData));

      // Lógica adicional (pode enviar dados para o servidor, etc.)
      alert('Formulário enviado com sucesso!');
  });

  // Função de validação de e-mail simples
  function isValidEmail(email) {
      // Regex básico para verificar um e-mail
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      return emailRegex.test(email);
  }
});
