import { Col, Form, Button } from "react-bootstrap";

export default function CurrencyForm() {
  return (
    <div>
      <Form>
        <Form.Row>
          <Col>
            <Form.Control placeholder="Amount" />
          </Col>
          <Col>
            <Form.Control as="select">
              <option>Currency 1</option>
            </Form.Control>
          </Col>
          <Col>
            <Button variant="primary">Bidirectional</Button>
          </Col>
          <Col>
            <Form.Control as="select">
              <option>Currency 2</option>
            </Form.Control>
          </Col>
        </Form.Row>
      </Form>
    </div>
  );
}
