import ListGroup from "react-bootstrap/ListGroup";
import Col from "react-bootstrap/esm/Col";
import Row from "react-bootstrap/esm/Row";
import Button from "react-bootstrap/Button";
import { useNavigate } from "react-router-dom";
import { useMediaQuery } from "@mui/material";
import PropTypes from "prop-types";

const ProductListItem = ({ product, onDelete }) => {
  const navigate = useNavigate();
  const isSmallScreen = useMediaQuery("(max-width:768px)");
  return (
    <ListGroup.Item>
      <Row className="align-items-center">
        <Col>{product.name}</Col>
        <Col>{product.category}</Col>
        <Col>{product.subCategory}</Col>
        {!isSmallScreen && <Col>{product.countInStock}</Col>}
        {!isSmallScreen && <Col>{product.price}</Col>}

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

ProductListItem.propTypes = {
  product: PropTypes.object.isRequired,
  onDelete: PropTypes.func.isRequired,
};

export default ProductListItem;
