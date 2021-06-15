import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import CurrencyForm from "./components/CurrencyForm";
const currencyData = require("./api.json");
const chartData = require("./apiChartData.json");

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <CurrencyForm data={currencyData} chartData={chartData} />
      </header>
    </div>
  );
}

export default App;
