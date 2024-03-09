import OrderSteps from "../../Components/OrderSteps/OrderSteps";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { useContext, useEffect, useState } from "react";
import { Store } from "../../Store";
import ListGroup from "react-bootstrap/ListGroup";
import Button from "react-bootstrap/Button";
import axios from "axios";
import { toast } from "react-toastify";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import MessageBox from "../../Components/MessageBox/MessageBox";
import { loadStripe } from "@stripe/stripe-js";
import CartItem from "./Components/CartItem";
import { useMediaQuery } from "@mui/material";
import LoadingBox from "../../Components/LoadingBox/LoadingBox";
import "./PlaceOrder.css";

const PlaceOrder = () => {
  const params = useParams();
  const { id } = params;

  const navigate = useNavigate();
  const { state, dispatch: ctxDispatch } = useContext(Store);
  const { cart, userInfo } = state;
  const [isLoading, setIsLoading] = useState(false);

  const [order, setOrder] = useState();

  const { search } = useLocation();
  const sp = new URLSearchParams(search);
  const orderId = sp.get("order");
  let payment = sp.get("payment");
  const isSmallScreen = useMediaQuery("(max-width:768px)");

  if (payment && payment == "succesful" && localStorage.getItem("cartItems")) {
    try {
      localStorage.removeItem("cartItems");
      ctxDispatch({ type: "CART_CLEAR" });
    } catch (error) {
      payment = "";
    }
  }

  const deleteOrder = async (orderId) => {
    axios.delete(`/api/orders/${orderId}`);
  };

  if (payment && payment == "canceled" && orderId) {
    toast.error("Неуспешно плаќање");
    deleteOrder(orderId);
  }

  useEffect(() => {
    if (!userInfo) {
      return navigate("/");
    }
  }, [userInfo, navigate]);

  const cartItemsPrice = cart.cartItems.reduce(
    (a, c) => a + c.price * c.quantity,
    0
  );
  const deliveryPrice = cartItemsPrice > 1000 ? 0 : 300;
  const totalPrice = cartItemsPrice + deliveryPrice;

  const orderAction = async (status) => {
    try {
      const { data } = await axios.put(`/api/orders/${order._id}`, {
        status,
        paidAt: order.isPaid ? order.paidAt : Date.now(),
      });
      if (data) {
        setOrder(data);
        toast.success("Успешно ажурирана нарачка");
      }
    } catch {
      toast.error("Грешка при  ажурирање на статус");
    }
  };

  const placeOrderHandler = async () => {
    try {
      const { data } = await axios.post(
        "/api/orders",
        {
          orderItems: cart.cartItems,
          shippingAddress: cart.shippingAddress,
          paymentMethod: cart.paymentMethod,
          itemsPrice: cartItemsPrice,
          shippingPrice: deliveryPrice,
          totalPrice: totalPrice,
          isConfirmed: false,
          status: "confirmation",
        },
        {
          headers: {
            authorization: `Bearer ${userInfo.token}`,
          },
        }
      );
      localStorage.removeItem("cartItems");
      ctxDispatch({ type: "CART_CLEAR" });
      navigate(`/order/${data.order._id}`);
    } catch (error) {
      toast.error("Грешка при правење нарачка");
    }
  };

  const makePayment = async () => {
    try {
      setIsLoading(true);
      const stripe = await loadStripe(
        "pk_test_51OqGvpFgFfp0n8H4xSN22yU6bbXx8Wlb7Wn8NxtII085ItpypD1VZxe6HqTLWjCLqY9sb2znHwlyCJJbl138dCem0031e6THXj"
      );

      const { data } = await axios.post(
        "/api/orders",
        {
          orderItems: cart.cartItems,
          shippingAddress: cart.shippingAddress,
          paymentMethod: cart.paymentMethod,
          itemsPrice: cartItemsPrice,
          shippingPrice: deliveryPrice,
          totalPrice: totalPrice,
          isConfirmed: true,
          isPaid: true,
          paidAt: Date.now(),
          status: "shipping",
        },
        {
          headers: {
            authorization: `Bearer ${userInfo.token}`,
          },
        }
      );

      const response = await axios.post(
        "/api/payment/create-checkout-session",
        {
          products: cart.cartItems,
          order: data.order._id,
        }
      );

      const session = response.data;

      await stripe.redirectToCheckout({
        sessionId: session.id,
      });

      setIsLoading(false);
    } catch (error) {
      console.error("Error:", error);
      setIsLoading(false);
      toast.error("Грешка при плаќање");
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data } = await axios.get(`/api/orders/${id}`, {
          headers: { authorization: `Bearer ${userInfo.token}` },
        });
        setOrder(data[0]);
      } catch (err) {
        toast.error("Грешка при добивање на нарачката");
      }
    };
    if (id) fetchData();
  }, [userInfo.token, id]);

  return (
    <div className="container mb-5">
      <OrderSteps step={3} />
      <h3 className="mt-3 mb-5 text-center">
        {order ? `Нарачка ${order._id}` : "Потврди нарачка"}
      </h3>
      <Row className="mb-4">
        <Col xs={12} sm={12} md={6}>
          <Row className="orderInfoContainer">
            <h5>Испорака</h5>
            <p>
              <b>Име:</b>{" "}
              {order
                ? ` ${order.shippingAddress.name} ${order.shippingAddress.surname}`
                : ` ${cart.shippingAddress.name} ${cart.shippingAddress.surname}`}
            </p>
            <p>
              <b>Телефон:</b>
              {order
                ? ` ${order.shippingAddress.phoneNumber}`
                : ` ${cart.shippingAddress.phoneNumber}`}
            </p>
            <p>
              <b>Адреса:</b>
              {order
                ? ` ${order.shippingAddress.address}, ${order.shippingAddress.city}`
                : ` ${cart.shippingAddress.address} ${cart.shippingAddress.city}`}{" "}
            </p>
            {order ? (
              order.isDelivered ? (
                <MessageBox variant="success">
                  Доставено на {order.deliveredAt}
                </MessageBox>
              ) : order.isShipped ? (
                <MessageBox variant="primary">
                  Вашата нарачка е испратена на {order.shippedAt}.
                </MessageBox>
              ) : order.isConfirmed ? (
                <MessageBox variant="primary">
                  Вашата нарачка се процесира.
                </MessageBox>
              ) : (
                <MessageBox variant="danger">
                  Потребно е да ја потврдите нарачката. Ќе бидете контактирани
                  преку телефонскиот број оставен за контакт.
                </MessageBox>
              )
            ) : (
              <a href="/shipping#address">Измени</a>
            )}
          </Row>
          <Row className="mt-3 orderInfoContainer ">
            <h5>Плаќање</h5>
            <p>
              <b>Начин:</b> {order ? order.paymentMethod : cart.paymentMethod}
            </p>
            {order ? (
              order.isPaid ? (
                <MessageBox variant="success">
                  Платено на {order.paidAt}
                </MessageBox>
              ) : (
                <MessageBox variant="danger">Не е платено</MessageBox>
              )
            ) : (
              <a href="/shipping#paymentMethod">Измени</a>
            )}
          </Row>
          <Row className="mt-3 orderInfoContainer">
            <h5>Продукти</h5>
            <ListGroup
              variant="success"
              style={{ width: "95%", margin: "auto", marginTop: "20px" }}
            >
              <ListGroup.Item>
                <Row className="fw-bold text-center">
                  <Col xs={6}>Име</Col>
                  <Col>Количина</Col>
                  <Col>Цена</Col>
                </Row>
              </ListGroup.Item>
              <ListGroup className="mb-3">
                {order
                  ? order.orderItems.map((product) => (
                      <CartItem key={product._id} product={product} />
                    ))
                  : cart.cartItems.map((product) => (
                      <CartItem key={product._id} product={product} />
                    ))}
              </ListGroup>
            </ListGroup>

            {!order && <a href="/cart">Измени</a>}
          </Row>
        </Col>
        <Col xs={12} sm={12} md={5} className={`${isSmallScreen && "mt-3"}`}>
          <Row className="orderInfoContainer">
            <h5>Нарачка</h5>
            <ListGroup>
              <ListGroup.Item>
                <Row>
                  <Col>Продукти</Col>
                  <Col>
                    {order
                      ? order.itemsPrice.toFixed(2)
                      : cartItemsPrice.toFixed(2)}{" "}
                    ден
                  </Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>Испорака</Col>
                  <Col>
                    {order
                      ? order.shippingPrice.toFixed(2)
                      : deliveryPrice.toFixed(2)}{" "}
                    ден
                  </Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row className="fw-bold">
                  <Col>
                    <b>Вкупно</b>
                  </Col>
                  <Col>
                    <b>
                      {order
                        ? order.totalPrice.toFixed(2)
                        : totalPrice.toFixed(2)}{" "}
                      ден
                    </b>
                  </Col>
                </Row>
              </ListGroup.Item>
              {!order && (
                <ListGroup.Item>
                  <Row className="w-75 m-auto">
                    {cart.paymentMethod === "Во готово при достава" ? (
                      <Button variant="danger" onClick={placeOrderHandler}>
                        Потврди нарачка
                      </Button>
                    ) : (
                      <Button variant="danger" onClick={makePayment}>
                        {isLoading ? <LoadingBox /> : "Плати нарачка"}
                      </Button>
                    )}
                  </Row>
                </ListGroup.Item>
              )}
            </ListGroup>
          </Row>
          {order && userInfo.role == "admin" && (
            <Row className="mt-5 orderInfoContainer">
              <h5>Акции</h5>

              <Button
                disabled={order && order.status !== "confirmation"}
                onClick={() => orderAction("shipping")}
              >
                Потврди нарачка
              </Button>
              <hr className="mt-2 adminPartHr" />
              <Button
                disabled={order && order.status !== "shipping"}
                onClick={() => orderAction("delivery")}
              >
                Испрати нарачка
              </Button>
              <hr className="mt-2 adminPartHr" />
              <Button
                disabled={order && order.status !== "delivery"}
                onClick={() => orderAction("completed")}
              >
                Нарачката е пристигната
              </Button>
            </Row>
          )}
        </Col>
      </Row>
    </div>
  );
};

export default PlaceOrder;
