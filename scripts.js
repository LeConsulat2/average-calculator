function calculateIncome() {
  const weekly = parseFloat(document.getElementById('weekly').value) || 0;
  const fortnightly =
    parseFloat(document.getElementById('fortnightly').value) || 0;
  const monthly = parseFloat(document.getElementById('monthly').value) || 0;
  const oneoff = parseFloat(document.getElementById('oneoff').value) || 0;

  const weeklyIncome = weekly;
  const fortnightlyIncome = fortnightly / 2;
  const monthlyIncome = monthly / 4.33;
  const oneoffIncome = oneoff / 52;

  const totalWeeklyIncome =
    weeklyIncome + fortnightlyIncome + monthlyIncome + oneoffIncome;

  document.getElementById(
    'result',
  ).innerText = `Total Weekly Income: $${totalWeeklyIncome.toFixed(2)}`;
}
