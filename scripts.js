function calculateIncome() {
  const weekly = parseFloat(document.getElementById('weekly').value) || 0;
  const fortnightly =
    parseFloat(document.getElementById('fortnightly').value) || 0;
  const monthly = parseFloat(document.getElementById('monthly').value) || 0;

  const weeklyIncome = weekly;
  const fortnightlyIncome = fortnightly / 2;
  const monthlyIncome = monthly / 4;

  const totalWeeklyIncome = weeklyIncome + fortnightlyIncome + monthlyIncome;

  const resultElement = document.getElementById('result');
  resultElement.classList.remove('fade-in');
  resultElement.classList.add('fade-out');

  setTimeout(() => {
    resultElement.innerText = `Total Weekly Income: $${totalWeeklyIncome.toFixed(
      2,
    )}`;
    resultElement.classList.remove('fade-out');
    resultElement.classList.add('fade-in');
  }, 300);
}
