let expenses = [];
let incomes = [];

document.getElementById('add-expense').addEventListener('click', addExpense);
document.getElementById('add-income').addEventListener('click', addIncome);

document
  .getElementById('expense-form')
  .addEventListener('keydown', function (event) {
    if (event.key === 'Enter') {
      event.preventDefault();
      addExpense();
    }
  });

document
  .getElementById('income-form')
  .addEventListener('keydown', function (event) {
    if (event.key === 'Enter') {
      event.preventDefault();
      addIncome();
    }
  });

function addExpense() {
  const expenseName = document.getElementById('expense-name-1').value;
  const expenseFrequency = document.getElementById('expense-frequency-1').value;
  const expenseTotal =
    parseFloat(document.getElementById('expense-total-1').value) || 0;

  if (expenseTotal) {
    const expense = {
      name: expenseName,
      frequency: expenseFrequency,
      total: expenseTotal,
    };
    expenses.push(expense);
    updateExpenseList();
    resetExpenseInput();
    calculateExpenses();
    calculateTotal();
  }
}

function addIncome() {
  const incomeName = document.getElementById('income-name-1').value;
  const incomeFrequency = document.getElementById('income-frequency-1').value;
  const incomeTotal =
    parseFloat(document.getElementById('income-total-1').value) || 0;

  if (incomeTotal) {
    const income = {
      name: incomeName,
      frequency: incomeFrequency,
      total: incomeTotal,
    };
    incomes.push(income);
    updateIncomeList();
    resetIncomeInput();
    calculateIncome();
    calculateTotal();
  }
}

function updateExpenseList() {
  const container = document.getElementById('expenses-summary');
  container.innerHTML = '';
  expenses.forEach((expense, index) => {
    const expenseDiv = document.createElement('div');
    expenseDiv.classList.add('expense-summary');
    expenseDiv.innerHTML = `
            <span>${
              expense.name ? expense.name + ' - ' : ''
            }$${expense.total.toFixed(2)} (${expense.frequency})</span>
            <button onclick="removeExpense(${index})">Remove</button>
        `;
    container.appendChild(expenseDiv);
  });
}

function updateIncomeList() {
  const container = document.getElementById('incomes-summary');
  container.innerHTML = '';
  incomes.forEach((income, index) => {
    const incomeDiv = document.createElement('div');
    incomeDiv.classList.add('income-summary');
    incomeDiv.innerHTML = `
            <span>${
              income.name ? income.name + ' - ' : ''
            }$${income.total.toFixed(2)} (${income.frequency})</span>
            <button onclick="removeIncome(${index})">Remove</button>
        `;
    container.appendChild(incomeDiv);
  });
}

function removeExpense(index) {
  expenses.splice(index, 1);
  updateExpenseList();
  calculateExpenses();
  calculateTotal();
}

function removeIncome(index) {
  incomes.splice(index, 1);
  updateIncomeList();
  calculateIncome();
  calculateTotal();
}

function resetExpenseInput() {
  document.getElementById('expense-name-1').value = '';
  document.getElementById('expense-frequency-1').value = 'weekly';
  document.getElementById('expense-total-1').value = '';
}

function resetIncomeInput() {
  document.getElementById('income-name-1').value = '';
  document.getElementById('income-frequency-1').value = 'weekly';
  document.getElementById('income-total-1').value = '';
}

function calculateIncome() {
  let totalWeeklyIncome = 0;

  incomes.forEach((income) => {
    if (income.frequency === 'weekly') {
      totalWeeklyIncome += income.total;
    } else if (income.frequency === 'fortnightly') {
      totalWeeklyIncome += income.total / 2;
    } else if (income.frequency === 'monthly') {
      totalWeeklyIncome += income.total / 4;
    }
  });

  const incomeResult = document.getElementById('income-result');
  incomeResult.innerText = `Total Weekly Income: $${totalWeeklyIncome.toFixed(
    2,
  )}`;
}

function calculateExpenses() {
  let totalWeeklyExpenses = 0;

  expenses.forEach((expense) => {
    if (expense.frequency === 'weekly') {
      totalWeeklyExpenses += expense.total;
    } else if (expense.frequency === 'fortnightly') {
      totalWeeklyExpenses += expense.total / 2;
    } else if (expense.frequency === 'monthly') {
      totalWeeklyExpenses += expense.total / 4;
    }
  });

  const expenseResult = document.getElementById('expense-result');
  expenseResult.innerText = `Total Weekly Expenses: $${totalWeeklyExpenses.toFixed(
    2,
  )}`;
}

function calculateTotal() {
  const incomeResult =
    parseFloat(
      document
        .getElementById('income-result')
        .innerText.replace('Total Weekly Income: $', ''),
    ) || 0;
  const expenseResult =
    parseFloat(
      document
        .getElementById('expense-result')
        .innerText.replace('Total Weekly Expenses: $', ''),
    ) || 0;
  const total = incomeResult - expenseResult;

  const totalResult = document.getElementById('total-result');
  totalResult.innerText = `Net Weekly Total: $${total.toFixed(2)}`;
}
