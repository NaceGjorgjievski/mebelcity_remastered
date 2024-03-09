import { useContext, useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { getError } from "../../utils";
import axios from "axios";
import { Store } from "../../Store";
import { useNavigate, useLocation } from "react-router-dom";
import LoadingBox from "../../Components/LoadingBox/LoadingBox";

const Signup = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();
  const { search } = useLocation();
  const redirectInUrl = new URLSearchParams(search).get("redirect");
  const redirect = redirectInUrl ? redirectInUrl : "/";

  const { state, dispatch: ctxDispatch } = useContext(Store);
  const { userInfo } = state;

  const submitHandler = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    if (password !== confirmPassword) {
      toast.error("Лозинките не се совпаѓаат", { position: "bottom-center" });
      return;
    }
    try {
      const { data } = await axios.post("/api/users/signup", {
        firstName,
        lastName,
        email,
        password,
      });
      ctxDispatch({ type: "USER_SIGNIN", payload: data });
      localStorage.setItem("userInfo", JSON.stringify(data));
      setIsLoading(false);
      navigate(redirect || "/");
    } catch (err) {
      toast.error(getError(err), { position: "bottom-center" });
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (userInfo) {
      navigate(redirect);
    }
  }, [navigate, redirect, userInfo]);

  return (
    <div className="container">
      <div className="d-flex flex-column align-items-center justify-content-center">
        <h2 className="text-center mt-5">Регистрирај се</h2>
        <Form className="mt-5" onSubmit={submitHandler}>
          <Row className="mb-3">
            <Form.Group as={Col} md={6} controlId="firstName">
              <Form.Label>Име</Form.Label>
              <Form.Control
                type="text"
                placeholder="Име"
                required
                onChange={(e) => setFirstName(e.target.value)}
              />
            </Form.Group>

            <Form.Group as={Col} controlId="lastName">
              <Form.Label>Презиме</Form.Label>
              <Form.Control
                type="text"
                placeholder="Презиме"
                required
                onChange={(e) => setLastName(e.target.value)}
              />
            </Form.Group>
          </Row>

          <Form.Group className="mb-3" controlId="email">
            <Form.Label>Е-пошта</Form.Label>
            <Form.Control
              type="email"
              placeholder="Е-пошта"
              required
              onChange={(e) => setEmail(e.target.value)}
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="password">
            <Form.Label>Лозинка</Form.Label>
            <Form.Control
              type="password"
              placeholder="Лозинка"
              minLength={8}
              required
              onChange={(e) => setPassword(e.target.value)}
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="confirmPassword">
            <Form.Label>Потврди Лозинка</Form.Label>
            <Form.Control
              type="password"
              placeholder="Потврди Лозинка"
              minLength={8}
              required
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
            <ToastContainer />
          </Form.Group>
          <div className="d-flex flex-column justify-content-center align-items-center">
            <Button variant="danger" type="submit" size="lg" className="mt-3">
              {isLoading ? <LoadingBox /> : "Регистрирај се"}
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
