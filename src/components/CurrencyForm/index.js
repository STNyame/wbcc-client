import { Col, Form, Button } from "react-bootstrap";
import { useEffect, useState } from "react";
import CurrencyChart from "../CurrencyChart";
const currencyData = require("../../api.json");
const chartData = require("../../apiChartData.json");

export default function CurrencyForm() {
  const [data, setData] = useState();
  const [currencyOne, setCurrencyOne] = useState("EUR");
  const [currencyTwo, setCurrencyTwo] = useState("USD");
  const [amount, setAmount] = useState(0);
  const [convertAmount, setConvertAmount] = useState({});

  const handleConvert = (curOne, curTwo) => {
    const current = (1 / curOne) * amount;

    const converted = current * curTwo;
    setConvertAmount({
      converted: converted,
      current: current,
    });
    console.log(convertAmount);
  };
  const handleDirection = (curOne, curTwo) => {
    setCurrencyOne(curTwo);
    setCurrencyTwo(curOne);
  };
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
      <div>
        <Form>
          <Form.Row>
            <Col>
              <Form.Control
                placeholder="Amount"
                value={amount}
                onChange={(e) => {
                  setAmount(e.target.value);
                  setConvertAmount({});
                }}
              />
            </Col>
            <Col>
              <Form.Control
                as="select"
                value={currencyOne}
                onChange={(e) => {
                  setCurrencyOne(e.target.value);
                  setConvertAmount({});
                }}
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
              <Button
                variant="primary"
                onClick={() => {
                  handleDirection(currencyOne, currencyTwo);
                  handleConvert(
                    data.rates[currencyTwo],
                    data.rates[currencyOne]
                  );
                }}
              >
                Bidirectional
              </Button>
            </Col>
            <Col>
              <Form.Control
                as="select"
                value={currencyTwo}
                onChange={(e) => {
                  setCurrencyTwo(e.target.value);
                  setConvertAmount({});
                }}
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
          <Button
            variant="primary"
            onClick={() =>
              handleConvert(data.rates[currencyOne], data.rates[currencyTwo])
            }
          >
            Convert
          </Button>
          {convertAmount.converted && (
            <>
              <h5>
                {amount} {currencyOne}
              </h5>
              <h1>
                {convertAmount.converted} {currencyTwo}
              </h1>
            </>
          )}
        </Form>
      </div>
      {data && convertAmount.current && (
        <CurrencyChart data={data} amount={convertAmount.current} />
      )}
    </div>
  );
}
