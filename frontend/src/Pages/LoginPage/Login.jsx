import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { useContext, useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import { Store } from "../../Store";
import { getError } from "../../utils";
import { useMediaQuery } from "@mui/material";
import Container from "react-bootstrap/esm/Container";

const Login = () => {
  const navigate = useNavigate();
  const { search } = useLocation();
  const redirectInUrl = new URLSearchParams(search).get("redirect");
  const redirect = redirectInUrl ? redirectInUrl : "/";

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { state, dispatch: ctxDispatch } = useContext(Store);
  const { userInfo } = state;

  const isSmallScreen = useMediaQuery("(max-width:768px)");

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post("/api/users/signin", {
        email,
        password,
      });
      ctxDispatch({ type: "USER_SIGNIN", payload: data });
      localStorage.setItem("userInfo", JSON.stringify(data));
      if (data.role === "admin") navigate("/admin/addCategory");
      else navigate(redirect || "/");
    } catch (err) {
      toast.error(getError(err), { position: "bottom-center" });
    }
  };

  useEffect(() => {
    if (userInfo) {
      navigate(redirect);
    }
  }, [navigate, redirect, userInfo]);

  return (
    <Container fluid={isSmallScreen}>
      <div className="d-flex flex-column align-items-center justify-content-center">
        <h2 className="text-center mt-5">Најави се</h2>
        <Form
          className={`mt-5 ${!isSmallScreen && "form-width"}`}
          onSubmit={submitHandler}
        >
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
              required
              onChange={(e) => setPassword(e.target.value)}
            />
          </Form.Group>

          <div className="d-flex flex-column justify-content-center align-items-center">
            <Button variant="danger" type="submit" size="lg" className="mt-3">
              Најави се
            </Button>
            <p>
              Нов корисник? <a href="/signup">Регистрирај се</a>
            </p>
          </div>
          <ToastContainer />
        </Form>
      </div>
    </Container>
  );
};

export default Login;
