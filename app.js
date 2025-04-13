function addTrade() {
  const market = document.getElementById("market").value;
  const direction = document.getElementById("direction").value;
  const price = document.getElementById("price").value;
  const pattern = document.getElementById("pattern").value;

  if (!price) return alert("Podaj cenę wejścia");

  const trade = { market, direction, price, pattern };
  const trades = JSON.parse(localStorage.getItem("trades") || "[]");
  trades.push(trade);
  localStorage.setItem("trades", JSON.stringify(trades));
  renderTrades();
}

function renderTrades() {
  const trades = JSON.parse(localStorage.getItem("trades") || "[]");
  const table = document.getElementById("tradesTable");
  table.innerHTML = "";
  trades.forEach((trade, index) => {
    const row = document.createElement("tr");
    row.innerHTML = `
      <td>${trade.market}</td>
      <td>${trade.direction}</td>
      <td>${trade.price}</td>
      <td>${trade.pattern}</td>
      <td><button onclick="removeTrade(${index})">Usuń</button></td>
    `;
    table.appendChild(row);
  });
}

function removeTrade(index) {
  const trades = JSON.parse(localStorage.getItem("trades") || "[]");
  trades.splice(index, 1);
  localStorage.setItem("trades", JSON.stringify(trades));
  renderTrades();
}

renderTrades();