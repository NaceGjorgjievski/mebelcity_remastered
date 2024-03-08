import { useContext, useEffect, useState } from "react";
import OrderSteps from "../../Components/OrderSteps/OrderSteps";
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import { Store } from "../../Store";
import { useNavigate } from "react-router-dom";
import { useMediaQuery } from "@mui/material";
import "./AddressPage.css";

const AddressPage = () => {
  const isSmallScreen = useMediaQuery("(max-width:768px)");
  const { state, dispatch: ctxDispatch } = useContext(Store);
  const {
    userInfo,
    cart: { cartItems, shippingAddress, paymentMethod },
  } = state;

  const navigate = useNavigate();
  useEffect(() => {
    if (!userInfo) {
      navigate("/signin");
    }
    if (cartItems.length == 0) {
      navigate("/cart");
    }
  }, [userInfo, cartItems.length, navigate]);

  const [name, setName] = useState(userInfo.firstName);
  const [surname, setSurname] = useState(userInfo.lastName);
  const [address, setAddress] = useState(shippingAddress.address || "");
  const [city, setCity] = useState(shippingAddress.city || "");
  const [phoneNumber, setPhoneNumber] = useState(
    shippingAddress.phoneNumber || ""
  );
  const [postalCode, setPostalCode] = useState(
    shippingAddress.postalCode || ""
  );
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState(
    paymentMethod || "Со платежна картичка"
  );

  const submitHandler = (e) => {
    e.preventDefault();
    ctxDispatch({
      type: "SAVE_SHIPPING_ADDRESS",
      payload: {
        name,
        surname,
        address,
        city,
        postalCode,
        phoneNumber,
      },
    });
    localStorage.setItem(
      "shippingAddress",
      JSON.stringify({
        name,
        surname,
        address,
        city,
        postalCode,
        phoneNumber,
      })
    );
    ctxDispatch({
      type: "SAVE_PAYMENT_METHOD",
      payload: selectedPaymentMethod,
    });
    localStorage.setItem("paymentMethod", selectedPaymentMethod);
    navigate("/placeorder");
    console.log("Hello");
  };

  return (
    <div className="container">
      {!isSmallScreen && <OrderSteps step={2} />}

      <Form className="mt-5" onSubmit={submitHandler}>
        <Row
          className={`mt-5 p-4 ${
            isSmallScreen && "w-100"
          } shippingAddressRow m-auto`}
        >
          <h2 className="text-center">Адреса</h2>
          <h5 className="text-center">Внесете ги вашите податоци</h5>

          <Row id="address" className="mb-3 d-flex justify-content-center ">
            <Form.Group as={Col} xs={12} md="6" controlId="validationCustom01">
              <Form.Label>Име</Form.Label>
              <Form.Control
                required
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </Form.Group>
            <Form.Group as={Col} md="6" controlId="validationCustom02">
              <Form.Label>Презиме</Form.Label>
              <Form.Control
                required
                type="text"
                value={surname}
                onChange={(e) => setSurname(e.target.value)}
              />
            </Form.Group>
          </Row>
          <Row className="mb-3 d-flex justify-content-center">
            <Form.Group as={Col} md="7" controlId="validationCustom01">
              <Form.Label>Адреса</Form.Label>
              <Form.Control
                required
                type="text"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
              />
            </Form.Group>
            <Form.Group as={Col} md="5" controlId="validationCustom01">
              <Form.Label>Телефон</Form.Label>
              <Form.Control
                required
                type="text"
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
              />
            </Form.Group>
          </Row>
          <Row className="mb-3 d-flex justify-content-center">
            <Form.Group as={Col} md="6" controlId="validationCustom03">
              <Form.Label>Град</Form.Label>
              <Form.Control
                type="text"
                value={city}
                onChange={(e) => setCity(e.target.value)}
                required
              />
            </Form.Group>

            <Form.Group as={Col} md="6" controlId="validationCustom05">
              <Form.Label>Поштенски код</Form.Label>
              <Form.Control
                type="text"
                value={postalCode}
                onChange={(e) => setPostalCode(e.target.value)}
                required
              />
            </Form.Group>
          </Row>
        </Row>
        <Row
          id="paymentMethod"
          className={`mt-5 p-4 ${
            isSmallScreen && "w-100"
          } shippingAddressRow m-auto`}
          /*   style={{
            width: "60%",
            margin: "auto",
            border: "1px solid black",
            borderRadius: "15px",
          }} */
        >
          <h2 className="text-center">Начин на плаќање</h2>
          <h5 className="text-center">Изберете начин на плаќање</h5>

          <Row
            className="mb-3 d-flex justify-content-center align-items-center"
            style={{ fontSize: "20px" }}
          >
            <Form.Group as={Col} md="5" controlId="validationCustom01">
              <Form.Check
                type="radio"
                id="Karticka"
                label="Со платежна картичка"
                value="Со платежна картичка"
                checked={selectedPaymentMethod === "Со платежна картичка"}
                onChange={(e) => setSelectedPaymentMethod(e.target.value)}
              />
            </Form.Group>
            <Form.Group as={Col} md="5" controlId="validationCustom01">
              <Form.Check
                type="radio"
                id="voGotovo"
                label="Во готово при достава"
                value="Во готово при достава"
                checked={selectedPaymentMethod === "Во готово при достава"}
                onChange={(e) => setSelectedPaymentMethod(e.target.value)}
              />
            </Form.Group>
          </Row>
        </Row>
        <Row
          className="mt-3 mb-4"
          style={{
            width: "60%",
            margin: "auto",
          }}
        >
          <Button
            className="mb-5"
            style={{ fontSize: "20px" }}
            variant="danger"
            type="submit"
          >
            Продолжи
          </Button>
        </Row>
      </Form>
    </div>
  );
};

export default AddressPage;
