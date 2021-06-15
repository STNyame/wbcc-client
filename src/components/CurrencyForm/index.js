import { Col, Form, Button } from "react-bootstrap";
import { useEffect, useState } from "react";
const currencyData = require("../../api.json");

export default function CurrencyForm() {
  const [data, setData] = useState();
  const [currencyOne, setCurrencyOne] = useState("EUR");
  const [currencyTwo, setCurrencyTwo] = useState("USD");
  useEffect(() => {
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
    setData(currencyData);
  }, []);
  return (
    <div>
      <Form>
        <Form.Row>
          <Col>
            <Form.Control placeholder="Amount" />
          </Col>
          <Col>
            <Form.Control
              as="select"
              value={currencyOne}
              onChange={(e) => setCurrencyOne(e.target.value)}
            >
              {data &&
                Object.keys({ ...data.rates }).map((item, i) => (
                  <option value={item} key={i}>
                    {item}
                  </option>
                ))}
            </Form.Control>
          </Col>
          <Col>
            <Button variant="primary">Bidirectional</Button>
          </Col>
          <Col>
            <Form.Control
              as="select"
              value={currencyTwo}
              onChange={(e) => setCurrencyTwo(e.target.value)}
            >
              {data &&
                Object.keys({ ...data.rates }).map((item, i) => (
                  <option value={item} key={i}>
                    {item}
                  </option>
                ))}
            </Form.Control>
          </Col>
        </Form.Row>
        <Button variant="primary">Convert</Button>
      </Form>
    </div>
  );
}
