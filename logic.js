
// Przykładowa logika formacji i generowania sygnału
const trendData = fetch('trend.csv');
const seasonalityData = fetch('seasonality.csv');
const cotData = fetch('cot.csv');

// Na bazie tych danych aplikacja generuje sygnały w formacie:
// Formacja: 1-2-3, TTE, itp. | Trend: up | Sezonowość: wzrosty | COT: wzrosty +57000 | RR 2:1
