function loadData() {
  fetch('data.json')
    .then(r => r.json())
    .then(data => {
      const output = document.getElementById('output');
      output.innerHTML = '';
      data.forEach(m => {
        const box = document.createElement('div');
        box.innerHTML = `<strong>${m.rynek}</strong><br>Trend: ${m.trend}<br>Sezonowość: ${m.sezonowosc}<br>COT: ${m.cot}`;
        output.appendChild(box);
      });
    });
}
function exportCSV() {
  fetch('data.json')
    .then(r => r.json())
    .then(data => {
      let csv = "Rynek,Trend,Sezonowość,COT\n";
      data.forEach(m => csv += `${m.rynek},${m.trend},${m.sezonowosc},${m.cot}\n`);
      const blob = new Blob([csv], { type: 'text/csv' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url; a.download = 'statusy_rynkow.csv'; a.click();
    });
}
function addPosition(e) {
  e.preventDefault();
  const m = document.getElementById('market').value;
  const f = document.getElementById('formation').value;
  const rr = document.getElementById('rr').value;
  const entry = document.getElementById('entry').value;
  const p = { market: m, formation: f, rr: rr, entry: entry };
  let positions = JSON.parse(localStorage.getItem('positions')) || [];
  positions.push(p);
  localStorage.setItem('positions', JSON.stringify(positions));
  displayPositions();
  document.getElementById('positionForm').reset();
}
function displayPositions() {
  const positions = JSON.parse(localStorage.getItem('positions')) || [];
  const container = document.getElementById('positions');
  container.innerHTML = '';
  positions.forEach(p => {
    const d = document.createElement('div');
    d.innerHTML = `<strong>${p.market}</strong><br>Formacja: ${p.formation}<br>RR: ${p.rr}<br>Cena wejścia: ${p.entry}`;
    container.appendChild(d);
  });
}
window.onload = () => { displayPositions(); loadData(); };