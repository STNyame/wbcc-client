import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import CurrencyForm from "./components/CurrencyForm";
const currencyData = require("./api.json");
const chartData = require("./apiChartData.json");

function App() {
  // useEffect(() => {
  // const fetchData = async () => {
  //   try {
  //     const res = await axios.get(
  //       `http://api.exchangeratesapi.io/v1/latest?access_key=627eac13bdbc305e6e615008b83e46c5&format=1`
  //     );
  //     setData(res.data);
  //   } catch (e) {
  //     console.log(e.message);
  //   }
  // };
  // fetchData();
  // }, []);
  return (
    <div className="App">
      <header className="App-header">
        <CurrencyForm data={currencyData} chartData={chartData} />
      </header>
    </div>
  );
}

export default App;
