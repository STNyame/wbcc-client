import { Col, Form, Button, Collapse, Row } from "react-bootstrap";
import { useEffect, useState } from "react";
import CurrencyChart from "../CurrencyChart";
import { useHistory } from "react-router-dom";

export default function CurrencyForm(props) {
  const [data, setData] = useState();
  const [currencyOne, setCurrencyOne] = useState("EUR");
  const [currencyTwo, setCurrencyTwo] = useState("USD");
  const [amount, setAmount] = useState(0);
  const [convertAmount, setConvertAmount] = useState({});
  const [open, setOpen] = useState(false);
  const history = useHistory();

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
    setData(props.data);
  }, [props.data]);
  useEffect(() => {
    history.push(`/${currencyOne}`);
  }, [currencyOne, history]);
  return (
    <div>
      <div>
        <Form onSubmit={(e) => e.preventDefault()}>
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
            <Row>
              <Button
                variant="primary"
                style={{ margin: "0 20px" }}
                onClick={() => {
                  handleDirection(currencyOne, currencyTwo);

                  amount > 0 &&
                    handleConvert(
                      data.rates[currencyTwo],
                      data.rates[currencyOne]
                    );
                }}
              >
                {"< >"}
              </Button>
            </Row>
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
          <Row>
            <Button
              style={{ margin: "30px 0 30px 15px" }}
              variant="primary"
              disabled={amount <= 0}
              type="submit"
              onClick={() =>
                handleConvert(data.rates[currencyOne], data.rates[currencyTwo])
              }
            >
              Convert
            </Button>
          </Row>
          {convertAmount.converted && (
            <div style={{ textAlign: "left" }}>
              <h5>
                {amount} {currencyOne} =
              </h5>
              <h1>
                {convertAmount.converted} {currencyTwo}
              </h1>
            </div>
          )}
        </Form>
      </div>
      <Row>
        <Button
          onClick={() => {
            setOpen(!open);
          }}
          style={{ margin: "30px 0 30px 15px" }}
          aria-controls="collapse-chart"
          aria-expanded={open}
          disabled={amount <= 0}
        >
          Show chart
        </Button>
      </Row>
      <Row>
        <Col>
          <Collapse in={open}>
            <div id="collapse-chart">
              {data && convertAmount.current && (
                <CurrencyChart
                  data={props.chartData}
                  amount={convertAmount.current}
                />
              )}
            </div>
          </Collapse>
        </Col>
      </Row>
    </div>
  );
}
