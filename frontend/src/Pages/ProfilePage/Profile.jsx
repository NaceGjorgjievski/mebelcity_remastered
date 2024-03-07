import Col from "react-bootstrap/esm/Col";
import Row from "react-bootstrap/esm/Row";
import { useContext, useState } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { toast } from "react-toastify";
import axios from "axios";
import { Store } from "../../Store";
import { getError } from "../../utils";

const Profile = () => {
  const { state, dispatch: ctxDispatch } = useContext(Store);
  const { userInfo } = state;
  const [firstName, setFirstName] = useState(userInfo.firstName);
  const [lastName, setLastName] = useState(userInfo.lastName);
  const [email, setEmail] = useState(userInfo.email);
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const submitHandler = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      toast.error("Лозинките не се совпаѓаат", { position: "bottom-center" });
      return;
    }
    try {
      const { data } = await axios.put(
        "/api/users/profile",
        {
          firstName,
          lastName,
          email,
          password,
        },
        {
          headers: { Authorization: `Bearer ${userInfo.token}` },
        }
      );
      ctxDispatch({ type: "USER_SIGNIN", payload: data });
      localStorage.setItem("userInfo", JSON.stringify(data));
      toast.success("Успешно ажурирање");
    } catch (err) {
      toast.error(getError(err));
    }
  };

  return (
    <div className="container">
      <div className="d-flex flex-column align-items-center justify-content-center">
        <h2 className="text-center mt-5">Моите подтоци</h2>
        <Form className="mt-5" onSubmit={submitHandler}>
          <Row className="mb-3">
            <Form.Group as={Col} controlId="firstName">
              <Form.Label>Име</Form.Label>
              <Form.Control
                type="text"
                value={firstName}
                required
                onChange={(e) => setFirstName(e.target.value)}
              />
            </Form.Group>

            <Form.Group as={Col} controlId="lastName">
              <Form.Label>Презиме</Form.Label>
              <Form.Control
                type="text"
                value={lastName}
                required
                onChange={(e) => setLastName(e.target.value)}
              />
            </Form.Group>
          </Row>

          <Form.Group className="mb-3" controlId="email">
            <Form.Label>Е-пошта</Form.Label>
            <Form.Control
              type="email"
              value={email}
              required
              onChange={(e) => setEmail(e.target.value)}
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="password">
            <Form.Label>Лозинка</Form.Label>
            <Form.Control
              type="password"
              value={password}
              minLength={8}
              required
              onChange={(e) => setPassword(e.target.value)}
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="confirmPassword">
            <Form.Label>Потврди Лозинка</Form.Label>
            <Form.Control
              type="password"
              value={confirmPassword}
              minLength={8}
              required
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
          </Form.Group>
          <div className="d-flex flex-column justify-content-center align-items-center mb-4">
            <Button variant="danger" type="submit" size="lg" className="mt-3">
              Ажурирај
            </Button>
          </div>
        </Form>
      </div>
    </div>
  );
};

export default Profile;
