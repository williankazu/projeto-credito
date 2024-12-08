document.addEventListener('DOMContentLoaded', function() {
    const loanForm = document.getElementById('loan-form');
    const resultDiv = document.getElementById('result');
    const totalEl = document.getElementById('total');
    const monthlyEl = document.getElementById('monthly');

    loanForm.addEventListener('submit', function(e) {
        e.preventDefault();

        // Obter valores do formulário
        const principal = parseFloat(document.getElementById('amount').value);
        const interestRate = parseFloat(document.getElementById('interest').value) / 100 / 12;
        const payments = parseFloat(document.getElementById('years').value) * 12;

        // Cálculo da parcela mensal
        const x = Math.pow(1 + interestRate, payments);
        const monthly = (principal * x * interestRate) / (x - 1);

        if (isFinite(monthly)) {
            const total = monthly * payments;
            monthlyEl.textContent = monthly.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
            totalEl.textContent = total.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
            resultDiv.classList.remove('hidden');
        } else {
            showError('Por favor, verifique os números inseridos.');
        }
    });

    function showError(message) {
        // Ocultar resultados se existentes
        resultDiv.classList.add('hidden');

        // Criar uma div para a mensagem de erro
        const errorDiv = document.createElement('div');
        errorDiv.className = 'error';
        errorDiv.appendChild(document.createTextNode(message));

        // Inserir a mensagem antes do formulário
        const container = document.querySelector('.calculator .container');
        const form = document.getElementById('loan-form');
        container.insertBefore(errorDiv, form);

        // Remover a mensagem após 3 segundos
        setTimeout(() => {
            errorDiv.remove();
        }, 3000);
    }
});
