import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Card, Col, Container, Row } from "react-bootstrap";
import CurrencyForm from "../components/CurrencyForm";
const moment = require("moment");

export default function LandingPage() {
  const queryParam = useParams();
  const [currencyData, setCurrencyData] = useState();
  const [chartData, setChartData] = useState();
  const previousDate = moment().subtract(1, "years");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const CUR = queryParam.cur;
        const resData = await axios.get(
          `https://openexchangerates.org/api/latest.json?app_id=ad48058249fa41cfac0f32dcf0bceea7`
        );

        const resChart = await axios.get(
          `https://openexchangerates.org/api/latest.json?app_id=ad48058249fa41cfac0f32dcf0bceea7&symbols=${CUR},USD,GBP,AUD,CAD,CHF`
        );
        const oldChart = await axios.get(
          `https://openexchangerates.org/api/historical/${previousDate.format(
            "YYYY-MM-DD"
          )}.json?app_id=ad48058249fa41cfac0f32dcf0bceea7&symbols=${CUR},USD,GBP,AUD,CAD,CHF`
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
