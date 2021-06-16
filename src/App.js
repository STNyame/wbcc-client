import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import CurrencyForm from "./components/CurrencyForm";
import { Card, Col, Container, Row } from "react-bootstrap";
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
        <div className="header-div"></div>
        <Container>
          <Card className="card-style" bg="dark">
            <Card.Header>
              <Row>
                <h1 style={{ marginLeft: "15px" }}>Currency converter</h1>
              </Row>
            </Card.Header>
            <Card.Body>
              {/* <Card.Title>Special title treatment</Card.Title>
              <Card.Text>
                With supporting text below as a natural lead-in to additional
                content.
              </Card.Text> */}
              <Row>
                <Col>
                  <CurrencyForm data={currencyData} chartData={chartData} />
                </Col>
              </Row>
            </Card.Body>
          </Card>
        </Container>
      </header>
    </div>
  );
}

export default App;
