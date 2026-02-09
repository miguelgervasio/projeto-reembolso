// Seleciona os elementos do formulário
const amount = document.getElementById("amount");

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
