function loadData() {
  fetch('data.json')
    .then(response => response.json())
    .then(data => {
      const output = document.getElementById('output');
      output.innerHTML = '';
      data.forEach(market => {
        const div = document.createElement('div');
        div.innerHTML = `<strong>${market.market}</strong><br>
          Trend W1: ${market.trend}<br>
          Sezonowość: ${market.seasonality}<br>
          COT: ${market.cot.direction} ${market.cot.value}`;
        output.appendChild(div);
      });
    })
    .catch(err => {
      document.getElementById('output').innerHTML = 'Błąd ładowania danych.';
      console.error(err);
    });
}