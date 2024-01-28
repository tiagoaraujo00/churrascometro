document.addEventListener('DOMContentLoaded', function () {
    const contactForm = document.getElementById('contactForm');
    const resultTable = document.getElementById('resultTable');
  
    // Carregar dados do localStorage, se disponíveis
    const storedData = JSON.parse(localStorage.getItem('formData')) || {};
    document.getElementById('name').value = storedData.name || '';
    document.getElementById('email').value = storedData.email || '';
    document.getElementById('cep').value = storedData.cep || '';
    document.getElementById('consent').checked = storedData.consent || true;
  
    // Função de validação de e-mail simples
    function isValidEmail(email) {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      return emailRegex.test(email);
    }
  
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
  
     
      alert('Formulário enviado com sucesso!');
  

      const men = parseInt(document.getElementById('men').value, 10);
      const women = parseInt(document.getElementById('women').value, 10);
      const children = parseInt(document.getElementById('children').value, 10);
      const drinkers = parseInt(document.getElementById('drinkers').value, 10);
  

      calculateAndDisplayResults(men, women, children, drinkers);
    });
  
    function calculateAndDisplayResults(men, women, children, drinkers) {

      const results = {
        'Carne': formatQuantity(0.4 * men + 0.32 * women + 0.2 * children, 'kg'),
        'Pão de alho': (2 * men + 1 * children),
        'Carvão': formatQuantity(1 * (men + women + children), 'kg'),
        'Sal': formatQuantity(0.04 * (men + women + children), 'kg'),
        'Gelo': (drinkers > 0) ? formatQuantity(5 * Math.ceil((men + women + children) / 10), 'kg') : 0, 
        'Refrigerante': (Math.ceil((men + women + children) / 5) >= 2) ? '2L' : 0, 
        'Água': (Math.ceil((men + women + children) / 5) >= 1) ? '1L' : 0, 
        'Cerveja': formatQuantity(3 * (men + women), 'ml')

      };
  

      let resultTableContent = `
        <tr>
          <th>Item</th>
          <th>Quantidade</th>
        </tr>
      `;
  
      for (const item in results) {
        resultTableContent += `
          <tr>
            <td>${item}</td>
            <td>${results[item]}</td>
          </tr>
        `;
      }
  

      resultTable.innerHTML = resultTableContent;
  

      showStep(3);
    }
  

    function showStep(stepNumber) {
      const steps = document.querySelectorAll('.step');
      steps.forEach(step => step.style.display = 'none');
  
      const currentStep = document.getElementById(`step${stepNumber}`);
      if (currentStep) {
        currentStep.style.display = 'block';
      }
    }

    function formatQuantity(value, unit) {
        if (value >= 1) {
          return value.toFixed(2) + ' ' + unit;
        } else {
          return (value * 1000).toFixed(2) + ' gr';
        }
      }
  });
  