import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";

const Signup = () => {
  return (
    <div className="container">
      <div className="d-flex flex-column align-items-center justify-content-center">
        <h2 className="text-center mt-5">Регистрирај се</h2>
        <Form className="mt-5">
          <Row className="mb-3">
            <Form.Group as={Col} controlId="firstName">
              <Form.Label>Име</Form.Label>
              <Form.Control type="text" placeholder="Име" />
            </Form.Group>

            <Form.Group as={Col} controlId="lastName">
              <Form.Label>Презиме</Form.Label>
              <Form.Control type="text" placeholder="Презиме" />
            </Form.Group>
          </Row>

          <Form.Group className="mb-3" controlId="email">
            <Form.Label>Е-пошта</Form.Label>
            <Form.Control type="email" placeholder="Е-пошта" />
          </Form.Group>

          <Form.Group className="mb-3" controlId="password">
            <Form.Label>Лозинка</Form.Label>
            <Form.Control type="password" placeholder="Лозинка" />
          </Form.Group>

          <Form.Group className="mb-3" controlId="password">
            <Form.Label>Потврди Лозинка</Form.Label>
            <Form.Control type="password" placeholder="Потврди Лозинка" />
          </Form.Group>
          <div className="d-flex flex-column justify-content-center align-items-center">
            <Button variant="danger" type="submit" size="lg" className="mt-3">
              Регистрирај се
            </Button>
            <p>
              Имате профил? <a href="/login">Најави се</a>
            </p>
          </div>
        </Form>
      </div>
    </div>
  );
};

export default Signup;
