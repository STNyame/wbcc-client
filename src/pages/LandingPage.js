import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Card, Col, Container, Row } from "react-bootstrap";
import CurrencyForm from "../components/CurrencyForm";

export default function LandingPage() {
  const queryParam = useParams();
  const [currencyData, setCurrencyData] = useState();
  const [chartData, setChartData] = useState();
  useEffect(() => {
    const fetchData = async () => {
      try {
        const CUR = queryParam.cur;
        const resData = await axios.get(
          `http://api.exchangeratesapi.io/v1/latest?access_key=627eac13bdbc305e6e615008b83e46c5&format=1`
        );

        const resChart = await axios.get(
          `http://api.exchangeratesapi.io/v1/latest?access_key=627eac13bdbc305e6e615008b83e46c5&symbols=${CUR},USD,GBP,AUD,CAD,CHF&format=1`
        );
        const oldChart = await axios.get(
          `http://api.exchangeratesapi.io/v1/2020-06-16?access_key=627eac13bdbc305e6e615008b83e46c5&symbols=${CUR},USD,GBP,AUD,CAD,CHF&format=1`
        );
        setCurrencyData(resData.data);
        setChartData({
          ...chartData,
          latest: resChart.data,
          old: oldChart.data,
        });
      } catch (e) {
        console.log(e.message);
      }
    };
    fetchData();
  }, [queryParam.cur]);

  return (
    <Container>
      <Card className="card-style" bg="dark">
        <Card.Header>
          <Row>
            <h1 style={{ marginLeft: "15px" }}>Currency converter</h1>
          </Row>
        </Card.Header>
        <Card.Body>
          <Row>
            <Col>
              <CurrencyForm data={currencyData} chartData={chartData} />
            </Col>
          </Row>
        </Card.Body>
      </Card>
    </Container>
  );
}
