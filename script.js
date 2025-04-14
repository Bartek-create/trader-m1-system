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
    });
}

function exportCSV() {
  fetch('data.json')
    .then(response => response.json())
    .then(data => {
      let csv = "Market,Trend W1,Sezonowość,COT
";
      data.forEach(m => {
        csv += `${m.market},${m.trend},${m.seasonality},${m.cot.direction} ${m.cot.value}
`;
      });
      const blob = new Blob([csv], { type: 'text/csv' });
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.setAttribute('href', url);
      a.setAttribute('download', 'statusy_rynkow.csv');
      a.click();
    });
}

function addPosition(event) {
  event.preventDefault();
  const market = document.getElementById('market').value;
  const formation = document.getElementById('formation').value;
  const rr = document.getElementById('rr').value;
  const entry = document.getElementById('entry').value;

  const newPosition = { market, formation, rr, entry };
  let positions = JSON.parse(localStorage.getItem('positions')) || [];
  positions.push(newPosition);
  localStorage.setItem('positions', JSON.stringify(positions));
  displayPositions();
  document.getElementById('positionForm').reset();
}

function displayPositions() {
  const positions = JSON.parse(localStorage.getItem('positions')) || [];
  const container = document.getElementById('positions');
  container.innerHTML = '';
  positions.forEach((p, index) => {
    const div = document.createElement('div');
    div.innerHTML = `<strong>${p.market}</strong><br>
      Formacja: ${p.formation}<br>
      RR: ${p.rr}<br>
      Cena wejścia: ${p.entry}`;
    container.appendChild(div);
  });
}

window.onload = () => {
  displayPositions();
  loadData();
};