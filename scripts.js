let expenseCount = 1;
let expenses = [];

document.getElementById('add-expense').addEventListener('click', () => {
  if (expenseCount < 10) {
    const expenseName = document.getElementById('expense-name-1').value;
    const expenseFrequency = document.getElementById(
      'expense-frequency-1',
    ).value;
    const expenseTotal =
      parseFloat(document.getElementById('expense-total-1').value) || 0;

    if (expenseName && expenseTotal) {
      const expense = {
        name: expenseName,
        frequency: expenseFrequency,
        total: expenseTotal,
      };
      expenses.push(expense);
      updateExpenseList();
      resetExpenseInput();
    }
  }
});

function updateExpenseList() {
  const container = document.getElementById('expenses-summary');
  container.innerHTML = '';
  expenses.forEach((expense, index) => {
    const expenseDiv = document.createElement('div');
    expenseDiv.classList.add('expense-summary');
    expenseDiv.innerHTML = `
            <span>${expense.name} - $${expense.total.toFixed(2)} (${
      expense.frequency
    })</span>
            <button onclick="removeExpense(${index})">Remove</button>
        `;
    container.appendChild(expenseDiv);
  });
}

function removeExpense(index) {
  expenses.splice(index, 1);
  updateExpenseList();
}

function resetExpenseInput() {
  document.getElementById('expense-name-1').value = '';
  document.getElementById('expense-frequency-1').value = 'weekly';
  document.getElementById('expense-total-1').value = '';
}

function calculateIncome() {
  const weekly = parseFloat(document.getElementById('weekly').value) || 0;
  const fortnightly =
    parseFloat(document.getElementById('fortnightly').value) || 0;
  const monthly = parseFloat(document.getElementById('monthly').value) || 0;

  const weeklyIncome = weekly;
  const fortnightlyIncome = fortnightly / 2;
  const monthlyIncome = monthly / 4.33;

  const totalWeeklyIncome = weeklyIncome + fortnightlyIncome + monthlyIncome;

  const incomeResult = document.getElementById('income-result');
  incomeResult.classList.remove('fade-in');
  incomeResult.classList.add('fade-out');

  setTimeout(() => {
    incomeResult.innerText = `Total Weekly Income: $${totalWeeklyIncome.toFixed(
      2,
    )}`;
    incomeResult.classList.remove('fade-out');
    incomeResult.classList.add('fade-in');
  }, 300);
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
  expenseResult.classList.remove('fade-in');
  expenseResult.classList.add('fade-out');

  setTimeout(() => {
    expenseResult.innerText = `Total Weekly Expenses: $${totalWeeklyExpenses.toFixed(
      2,
    )}`;
    expenseResult.classList.remove('fade-out');
    expenseResult.classList.add('fade-in');
  }, 300);
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
  totalResult.classList.remove('fade-in');
  totalResult.classList.add('fade-out');

  setTimeout(() => {
    totalResult.innerText = `Net Weekly Total: $${total.toFixed(2)}`;
    totalResult.classList.remove('fade-out');
    totalResult.classList.add('fade-in');
  }, 300);
}
