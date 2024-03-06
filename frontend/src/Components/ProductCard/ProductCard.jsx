import { useNavigate } from "react-router-dom";
import ShoppingBasketIcon from "@mui/icons-material/ShoppingCart";
import CheckIcon from "@mui/icons-material/Check";
import ClearIcon from "@mui/icons-material/Clear";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import { useContext } from "react";
import { Store } from "../../Store";
import { toast } from "react-toastify";

const ProductCard = ({ product }) => {
  const navigate = useNavigate();
  const { state, dispatch: ctxDispatch } = useContext(Store);
  const { cart } = state;

  const buttonClickHandler = (e) => {
    e.stopPropagation();
    ctxDispatch({
      type: "CART_ADD_ITEM",
      payload: { ...product, quantity: 1 },
    });
    toast.success("Продуктот е додаден во кошничката");
  };

  return (
    <Card
      style={{ width: "15rem", cursor: "pointer" }}
      onClick={() => navigate(`/products/${product.slug}`)}
    >
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
        <Button variant="danger" className=" w-75" onClick={buttonClickHandler}>
          <ShoppingBasketIcon />
        </Button>
      </Card.Body>
    </Card>
  );
};

export default ProductCard;
