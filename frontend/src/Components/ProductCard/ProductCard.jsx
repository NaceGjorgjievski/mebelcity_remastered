import { Link } from "react-router-dom";
import ShoppingBasketIcon from "@mui/icons-material/ShoppingCart";
import CheckIcon from "@mui/icons-material/Check";
import ClearIcon from "@mui/icons-material/Clear";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";

const ProductCard = ({ product }) => {
  return (
    <Card style={{ width: "15rem" }}>
      <Card.Img variant="top" src={product.images[0]} />
      <Card.Body className="text-center">
        <Card.Title className="text-start">{product.name}</Card.Title>
        <Card.Subtitle className="text-start">
          Цена: {product.price}ден
        </Card.Subtitle>
        {product.countInStock > 0 ? (
          <p className="text-start" style={{ color: "green" }}>
            <CheckIcon /> залиха
          </p>
        ) : (
          <p className="text-start" style={{ color: "red" }}>
            <ClearIcon /> залиха
          </p>
        )}
        <Button variant="danger" className=" w-75">
          <ShoppingBasketIcon />
        </Button>
      </Card.Body>
    </Card>
  );
};

export default ProductCard;
