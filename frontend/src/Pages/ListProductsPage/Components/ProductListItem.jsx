import ListGroup from "react-bootstrap/ListGroup";
import Col from "react-bootstrap/esm/Col";
import Row from "react-bootstrap/esm/Row";
import Button from "react-bootstrap/Button";
import { useNavigate } from "react-router-dom";

const ProductListItem = ({ product, onDelete }) => {
  const navigate = useNavigate();
  return (
    <ListGroup.Item>
      <Row className="align-items-center">
        <Col>{product.name}</Col>
        <Col>{product.category}</Col>
        <Col>{product.subCategory}</Col>
        <Col>{product.countInStock}</Col>
        <Col>{product.price}</Col>
        <Col className="d-flex justify-content-around">
          <Button onClick={() => navigate(`/admin/products/${product.slug}`)}>
            Измени
          </Button>
          <Button
            variant="danger"
            className="ms-3"
            onClick={() => onDelete(product._id)}
          >
            Избриши
          </Button>
        </Col>
      </Row>
    </ListGroup.Item>
  );
};

export default ProductListItem;
