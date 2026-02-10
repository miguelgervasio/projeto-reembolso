// Seleciona os elementos do formulário
const form = document.querySelector("form");
const amount = document.getElementById("amount");
const expense = document.getElementById("expense");
const category = document.getElementById("category");

// Seleciona os elementos da lista
const expenseList = document.querySelector("ul");
const expensesQuantity = document.querySelector("aside header p span");
const expensesTotal = document.querySelector("aside header h2");

// Captura o evento de input para formatar o valor
amount.oninput = () => {
  // Obtém o valor atual do input e remove os caractéres não numéricos
  let value = amount.value.replace(/\D/g, "");

  // Tranforma o valor em centavos
  value = Number(value) / 100;

  // Atualiza o valor exibido do input
  amount.value = formatCurrencyBRL(value);
};

function formatCurrencyBRL(value) {
  // Formata o valor no padrão BRL (Real Brasileiro)
  value = value.toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL",
  });

  return value;
}

// Captura o evento de submit do formulário para obter os valores
form.onsubmit = (event) => {
  // Previne o comportamento padrão de recarregar a página no submit
  event.preventDefault();

  // Cria um objeto com os detalhes da nova despesa
  const newExpense = {
    id: new Date().getTime(),
    expense: expense.value,
    category_id: category.value,
    category_name: category.options[category.selectedIndex].text,
    amount: amount.value,
    create_at: new Date(),
  };

  // Chama a função que irá adicionar o item na lista
  expenseAdd(newExpense);
};

// Adiciona um novo item na lista
function expenseAdd(newExpense) {
  try {
    // Cria o elemento para adicionar o item (li) na lista (ul)
    const expenseItem = document.createElement("li");
    expenseItem.classList.add("expense");

    // Cria o ícone da categoria
    const expenseIcon = document.createElement("img");
    expenseIcon.setAttribute("src", `img/${newExpense.category_id}.svg`);
    expenseIcon.setAttribute("alt", newExpense.category_name);

    // Cria a info da despesa
    const expenseInfo = document.createElement("div");
    expenseInfo.classList.add("expense-info");

    // Cria o nome da despesa
    const expenseName = document.createElement("strong");
    expenseName.textContent = newExpense.expense;

    // Cria a categoria da despesa
    const expenseCategory = document.createElement("span");
    expenseCategory.textContent = newExpense.category_name;

    // Adiciona name e category em expenseInfo (div)
    expenseInfo.append(expenseName, expenseCategory);

    // Cria o valor da despesa
    const expenseAmount = document.createElement("span");
    expenseAmount.classList.add("expense-amount");
    expenseAmount.innerHTML = `<small>R$</small>${newExpense.amount
      .toUpperCase()
      .replace("R$", "")}`;

    // Cria o ícone de remover
    const removeIcon = document.createElement("img");
    removeIcon.classList.add("remove-icon");
    removeIcon.setAttribute("src", "img/remove.svg");
    removeIcon.setAttribute("alt", "remover");

    // Adiciona as informações no item
    expenseItem.append(expenseIcon, expenseInfo, expenseAmount, removeIcon);

    // Adiciona o item na lista
    expenseList.append(expenseItem);

    // Limpa o formulário
    // form.reset();
    formClear();

    // Atualiza os totais
    updateTotals();
  } catch (err) {
    alert("Não foi possível atualizar a lista de despesas!");
    console.log(err);
  }
}

// Atualiza os totais
function updateTotals() {
  try {
    // Recupera todos os itens (li) da lista (ul)
    const items = expenseList.children;

    // Atualiza a quantidade de itens da lista
    expensesQuantity.textContent = `${items.length} ${items.length > 1 ? "despesas" : "despesa"}`;

    // Variável para incrementar o total
    let total = 0;

    // Percorre cada item (li) da lista (ul)
    for (let i = 0; i < items.length; i++) {
      const itemAmount = items[i].querySelector(".expense-amount");

      // Remover caracteres não numéricos e substitui vírgula pelo ponto
      let value = itemAmount.textContent
        .replace(/[^\d,]/g, "")
        .replace(",", ".");

      // Converte o valor para float
      value = parseFloat(value);

      // Verifica se é um número válido
      if (isNaN(value)) {
        return alert(
          "Não foi possível calcular o total. \nO valor não parece ser um número!",
        );
      }

      // Incrementa o valor total
      total += Number(value);
    }

    // Substitui o valor do total pelo R$ em <small>, formata o valor em BRL e remove o R$ que estava sem small
    expensesTotal.innerHTML = `<small>R$</small> ${formatCurrencyBRL(total).replace("R$", "")}`;
  } catch (err) {
    alert("Não foi possível atualizar os totais!");
    console.log(err);
  }
}

// Evento que captura o clique nos itens da lista
expenseList.addEventListener("click", function (event) {
  // Verifica se o elemento clicado é o ícone de remover
  if (event.target.classList.contains("remove-icon")) {
    // Obtém a li pai do elemento clicado (para não remover somente a imagem de X)
    const item = event.target.closest(".expense");

    // Remove o item da lista
    item.remove();
  }

  // Atualiza os totais
  updateTotals();
});

function formClear() {
  // Limpa os inputs
  expense.value = "";
  category.value = "";
  amount.value = "";

  // Foca no input de nome da despesa automaticamente
  expense.focus();
}
