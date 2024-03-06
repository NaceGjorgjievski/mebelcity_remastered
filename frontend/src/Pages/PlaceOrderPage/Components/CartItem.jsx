import ListGroup from "react-bootstrap/ListGroup";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

const CartItem = ({ product }) => {
  return (
    <ListGroup.Item
      style={{
        borderTopLeftRadius: "0px",
        borderTopRightRadius: "0px",
      }}
    >
      <Row className="fw-bold align-items-center text-center">
        <Col
          xs={6}
          className="d-flex justify-content-evenly"
          style={{ height: "50px" }}
        >
          <img
            src={product.image || product.images[0]}
            style={{ height: "100%" }}
          />
          <span className="d-flex align-items-center">{product.name}</span>
        </Col>
        <Col>{product.quantity}</Col>
        <Col>{product.price} ден</Col>
      </Row>
    </ListGroup.Item>
  );
};

export default CartItem;
