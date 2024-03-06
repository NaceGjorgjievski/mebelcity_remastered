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

const CartPage = () => {
  const navigate = useNavigate();
  const { state, dispatch: ctxDispatch } = useContext(Store);
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
    <div className="container">
      <OrderSteps step={1} />
      <div className="mt-5 d-flex flex-column justify-content-center align-items-center">
        <h3>{cartItems.length > 0 ? "Кошничка" : "Кошничката е празна"}</h3>
        {cartItems.length > 0 && (
          <ListGroup
            id="filteredProductsContainer"
            variant="success"
            style={{ width: "80%", margin: "auto", marginTop: "20px" }}
          >
            {cartItems.map((item) => (
              <ListGroup.Item key={item._id}>
                <Row className="d-flex align-items-center">
                  <Col>
                    <img src={item.images[0]} style={{ width: "100px" }} />
                    <span className="ms-2" style={{ fontSize: 20 }}>
                      {item.name}
                    </span>
                  </Col>
                  <Col className="d-flex">
                    <Button
                      variant="danger"
                      onClick={() => updateCartHandler(item, item.quantity - 1)}
                      disabled={item.quantity === 1}
                    >
                      <RemoveCircleIcon />
                    </Button>
                    <input
                      className="quantityInput"
                      readOnly
                      value={item.quantity}
                      style={{
                        width: "50px",
                        textAlign: "center",
                        marginLeft: "3px",
                        marginRight: "3px",
                      }}
                    />
                    <Button
                      variant="danger"
                      className="marginBtn"
                      onClick={() => updateCartHandler(item, item.quantity + 1)}
                      disabled={item.quantity === item.countInStock}
                    >
                      <AddCircleIcon />
                    </Button>
                  </Col>
                  <Col style={{ fontSize: "23px" }}>{item.price} ден</Col>
                  <Col
                    xs={1}
                    id="removeBtnDiv"
                    onClick={() => removeItemHandler(item)}
                  >
                    <DeleteIcon style={{ fontSize: "30px" }} />
                  </Col>
                </Row>
              </ListGroup.Item>
            ))}
          </ListGroup>
        )}
        {cartItems.length > 0 && (
          <hr className="mt-3 mb-3" style={{ color: "black", width: "80%" }} />
        )}
        {cartItems.length > 0 && (
          <Row style={{ width: "80%", fontSize: 23 }}>
            <Col className="ps-5">Вкупно</Col>
            <Col></Col>
            <Col>
              {cartItems.reduce((a, c) => a + c.price * c.quantity, 0)} ден
            </Col>
            <Col xs={1}></Col>
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
    </div>
  );
};

export default CartPage;
