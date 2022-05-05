// Ativando e desativando o Modal
// Preparando o array para receber os inputs gerando um modelo
// Recebendo os inputs e fazendo o cálculo dos incomes, expensive e total
// Enviar o resultado do JS para o HTML (client), substituindo os dados já existentes
// Criar variáveis para adicionar as funções para serem inseridas em outras funções ou processos

// ============ Modal - Ativado e Desativado ===========

// Adicionando e retirando a classe active do modal-overlay (formulário)
const modal = {
  open() {
    document.querySelector('.modal-overlay').classList.add('active');
  },
  close() {
    document.querySelector('.modal-overlay').classList.remove('active');
  },
};

// ======= Criando modelo e adicionando dados dos Inputs para alteração futura ===========

// Lista com cada objeto que vai receber os dados adicionados acompanhando o modelo do formulário com uma id
const transactions = [
  {
    id: 1,
    description: 'Luz',
    amount: -50000, // quando for dinheiro, colocar as casas decimais sem o . para formatar melhor e utilizar o sinal negativo quando valor negativo
    date: '23/01/2021',
  },
  {
    id: 2,
    description: 'Website',
    amount: 500000,
    date: '23/01/2021',
  },
  {
    id: 3,
    description: 'Internet',
    amount: -20000,
    date: '23/01/2021',
  },
];

//console.log(transactions);

// =========Funções com cálculos dos Inputs para apresentação  ===========

const transaction = {
  income() {
    // Pegar todas as transações
    let income = 0;
    // Para cada transação, se for maior do que zero somar a uma variável
    transactions.forEach((transaction) => {
      if (transaction.amount > 0) {
        income += transaction.amount;
      }
    });
    // retornar essa variável ao programa
    return income;
  },
  expense() {
    let expense = 0;
    // Para cada transaction (movimentação) dentro das transactions execute a função
    transactions.forEach((transaction) => {
      if (transaction.amount < 0) {
        expense += transaction.amount;
      }
    });
    return expense;
  },

  total() {
    // Pegar todas as transações
    // Subtrair o expense do income, atribuir o resultado a uma variável
    // retornar essa variável ao programa
    // Coloco o sinal de + pq o valor negativo já vem com o sinal de - colocado anteriormente
    return transaction.income() + transaction.expense();
  },
};

// ===========Pegar transações (dentro do transactions) pelo JS e devolver para o HTML (client) ========

// Variável que tem todas as funções que vão trabalhar as alterações do HTML pelo JS
const DOM = {
  /* 
  Criando um método para substituir o container tbody da table que contém os dados
  Agora quem faz as alterações no HTML é o JS
  Propriedade/Chave(transactionContainer(variável)) e valor(tbody) tbody dentro do objeto 
  */
  transactionContainer: document.querySelector('#data-table tbody'),

  // Função que vai receber o parâmetro e fazer a indexização (local aonde vai colocar)
  addTransaction(transaction, index) {
    console.log(transaction);
    const tr = document.createElement('tr');
    // Usando a função dentro do DOM que vai aplicar o modelo dentro do tr novo
    // (dentro do tr criado, coloque o modelo que vai retornar)
    tr.innerHTML = DOM.innerHTMLTransaction(transaction);

    // Criando um filho e colocando o tr dentro que vai assumir o papel do tbody
    DOM.transactionContainer.appendChild(tr);

    console.log(tr.innerHTML);
  },

  // Capturando o modelo do formulário e inserindo cada valor
  innerHTMLTransaction(transaction) {
    console.log(transaction);

    // Variável que dita a regra para a classe que vai alternar
    const CSSclass = transaction.amount > 0 ? 'income' : 'expense';

    // Criando a variável amount para trabalhar as regras da moeda
    const amount = utils.formatCurrency(transaction.amount);

    const html = `
        <td class="description">${transaction.description}</td>
        <td class="${CSSclass}">${amount}</td>
        <td class="date">${transaction.date}</td>
        <td><img src="./assets/minus.svg" alt="Remover transação" /></td>
        `;

    // Para eu deixar o conteúdo disponível ao JS para ser utilizado, preciso retornar ele ao programa
    return html;
  },
  // Atualizando os valores puxando-os das funções dentro do transaction
  updateBalance() {
    document.querySelector('#incomeDisplay').innerHTML = transaction.income();
    document.querySelector('#expenseDisplay').innerHTML = transaction.expense();
    document.querySelector('#totalDisplay').innerHTML = transaction.total();
  },
};

DOM.updateBalance();

// Criando uma regra para colocar o formato da moeda local
const utils = {
  formatCurrency(value) {
    const signal = Number(value) < 0 ? '-' : '';

    // Voltando para o formato string para usar o replace
    // Expressão regular(/\D/g). Ache tudo que não é número e troque pelo segundo valor
    value = String(value).replace(/\D/g, ''); // O dado virou uma string

    value = Number(value) / 100; // Com isso volta para número e fica com as casa decimais

    // Colocando o valor em formato local
    value = value.toLocaleString('pt-BR', {
      style: 'currency',
      currency: 'BRL',
    });

    //console.log(signal + value);

    // Concatenando as duas variáveis
    return signal + value;
  },
};

/* 
Chamando a função addTransaction que está dentro da variável DOM
Esse(s) parâmetro(s)/valor(es) vai substituir o parâmetro que está na função
DOM.addTransaction(transactions[0]); - Rodando a função através do forEach
*/

// forEach é uma funcionalidade que existe para objetos array, que nesse caso é uma coleção de objetos
// Para cada transação(transactions), rode uma funcionalidade. E nesse caso o argumento a ser trabalhado é o transaction
transactions.forEach(function (transaction) {
  DOM.addTransaction(transaction);
});
