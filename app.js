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

function clearTrades() {
    if (confirm("Czy na pewno chcesz usunąć wszystkie pozycje?")) {
        localStorage.removeItem("trades");
        renderTrades();
    }
}

function exportToCSV() {
    const trades = JSON.parse(localStorage.getItem("trades") || "[]");
    if (!trades.length) return alert("Brak danych do eksportu");

    const csvRows = [["Rynek", "Kierunek", "Cena wejścia", "Formacja"]];
    trades.forEach(trade => {
        csvRows.push([trade.market, trade.direction, trade.price, trade.pattern]);
    });

    const csvContent = csvRows.map(e => e.join(",")).join("\n");
    const blob = new Blob([csvContent], { type: "text/csv" });
    const url = URL.createObjectURL(blob);

    const a = document.createElement("a");
    a.setAttribute("hidden", "");
    a.setAttribute("href", url);
    a.setAttribute("download", "trader_m1_data.csv");
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
}

window.onload = renderTrades;
