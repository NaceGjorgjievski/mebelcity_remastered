import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";

const Login = () => {
  return (
    <div className="container">
      <div className="d-flex flex-column align-items-center justify-content-center">
        <h2 className="text-center mt-5">Најави се</h2>
        <Form className="mt-5" style={{ width: "400px" }}>
          <Form.Group className="mb-3" controlId="email">
            <Form.Label>Е-пошта</Form.Label>
            <Form.Control type="email" placeholder="Е-пошта" />
          </Form.Group>

          <Form.Group className="mb-3" controlId="password">
            <Form.Label>Лозинка</Form.Label>
            <Form.Control type="password" placeholder="Лозинка" />
          </Form.Group>

          <div className="d-flex flex-column justify-content-center align-items-center">
            <Button variant="danger" type="submit" size="lg" className="mt-3">
              Најави се
            </Button>
            <p>
              Нов корисник? <a href="/signup">Регистрирај се</a>
            </p>
          </div>
        </Form>
      </div>
    </div>
  );
};

export default Login;
