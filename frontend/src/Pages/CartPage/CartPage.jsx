import Button from "react-bootstrap/Button";
import ListGroup from "react-bootstrap/ListGroup";
import Row from "react-bootstrap/esm/Row";
import Col from "react-bootstrap/esm/Col";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { Store } from "../../Store";
import DeleteIcon from "@mui/icons-material/Delete";
import { toast } from "react-toastify";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import RemoveCircleIcon from "@mui/icons-material/RemoveCircle";
import OrderSteps from "../../Components/OrderSteps/OrderSteps";
import { Container, useMediaQuery } from "@mui/material";
import "./CartPage.css";

const CartPage = () => {
  const navigate = useNavigate();
  const { state, dispatch: ctxDispatch } = useContext(Store);
  const isSmallScreen = useMediaQuery("(max-width:428px)");

  const {
    cart: { cartItems },
  } = state;

  const updateCartHandler = async (item, quantity) => {
    if (item.countInStock < quantity) {
      toast.error("Нема довлна количина на залиха");
      return;
    }
    ctxDispatch({
      type: "CART_ADD_ITEM",
      payload: { ...item, quantity },
    });
  };

  const removeItemHandler = (item) => {
    ctxDispatch({ type: "CART_REMOVE_ITEM", payload: item });
  };

  console.log(cartItems);

  return (
    <Container>
      <OrderSteps step={1} />
      <div className="mt-5 d-flex flex-column justify-content-center align-items-center">
        <h3>{cartItems.length > 0 ? "Кошничка" : "Кошничката е празна"}</h3>
        {cartItems.length > 0 && (
          <ListGroup id="cartItemsContainer" variant="success">
            {cartItems.map((item) => (
              <ListGroup.Item key={item._id}>
                <Row /* id="cart-item-row" */>
                  <Col id="cart-item-row">
                    <Col className="item1">
                      <img src={item.images[0]} style={{ width: "100px" }} />

                      <span className="ms-2 cart-item-name">{item.name}</span>
                    </Col>
                    <Col className="d-flex cart-btn-container item2">
                      <Button
                        variant="danger"
                        onClick={() =>
                          updateCartHandler(item, item.quantity - 1)
                        }
                        disabled={item.quantity === 1}
                      >
                        <RemoveCircleIcon />
                      </Button>
                      <input
                        className="quantityInput"
                        readOnly
                        value={item.quantity}
                      />
                      <Button
                        variant="danger"
                        className="marginBtn"
                        onClick={() =>
                          updateCartHandler(item, item.quantity + 1)
                        }
                        disabled={item.quantity === item.countInStock}
                      >
                        <AddCircleIcon />
                      </Button>
                    </Col>
                    <Col className="item-price item3">{item.price} ден</Col>
                  </Col>
                  <Col
                    xs={1}
                    id="removeBtnDiv"
                    className="d-flex justify-content-center align-items-center"
                    onClick={() => removeItemHandler(item)}
                  >
                    <DeleteIcon id="cart-delete-btn" />
                  </Col>
                </Row>
              </ListGroup.Item>
            ))}
          </ListGroup>
        )}
        {cartItems.length > 0 && (
          <hr className="mt-3 mb-3 cart-line-separator" />
        )}
        {cartItems.length > 0 && (
          <Row id="cart-total-price">
            <Col className={`${!isSmallScreen && "ps-5"} fw-bold`}>Вкупно</Col>
            <Col id="cart-blank-col"></Col>
            <Col className={`${!isSmallScreen && "pe-5"} fw-bold text-end`}>
              {cartItems.reduce((a, c) => a + c.price * c.quantity, 0)} ден
            </Col>
            {/* <Col xs={1}></Col> */}
          </Row>
        )}

        {cartItems.length > 0 && (
          <Button
            variant="danger"
            className="mt-4 mb-5"
            style={{ fontSize: "20px" }}
            onClick={() => navigate("/login?redirect=/shipping")}
          >
            Нарачајте
          </Button>
        )}
      </div>
    </Container>
  );
};

export default CartPage;
