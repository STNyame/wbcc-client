import { Col, Form, Button, Collapse } from "react-bootstrap";
import { useEffect, useState } from "react";
import CurrencyChart from "../CurrencyChart";

export default function CurrencyForm(props) {
  const [data, setData] = useState();
  const [currencyOne, setCurrencyOne] = useState("EUR");
  const [currencyTwo, setCurrencyTwo] = useState("USD");
  const [amount, setAmount] = useState(0);
  const [convertAmount, setConvertAmount] = useState({});
  const [open, setOpen] = useState(false);

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
    setData(props.data);
  }, [props.data]);
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

                  amount > 0 &&
                    handleConvert(
                      data.rates[currencyTwo],
                      data.rates[currencyOne]
                    );
                }}
              >
                {"< >"}
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
            style={{ margin: "30px 0" }}
            variant="primary"
            disabled={amount <= 0}
            onClick={() =>
              handleConvert(data.rates[currencyOne], data.rates[currencyTwo])
            }
          >
            Convert
          </Button>
          {convertAmount.converted && (
            <div style={{ textAlign: "left" }}>
              <h5>
                {amount} {currencyOne}
              </h5>
              <h1>
                {convertAmount.converted} {currencyTwo}
              </h1>
            </div>
          )}
        </Form>
      </div>
      <>
        <Button
          onClick={() => setOpen(!open)}
          style={{ margin: "30px 0" }}
          aria-controls="example-collapse-chart"
          aria-expanded={open}
          visible
        >
          Show chart
        </Button>
        <Collapse in={open}>
          <div id="example-collapse-chart">
            {data && convertAmount.current && (
              <CurrencyChart
                data={props.chartData}
                amount={convertAmount.current}
              />
            )}
          </div>
        </Collapse>
      </>
    </div>
  );
}
