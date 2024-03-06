import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import ShoppingBasketIcon from "@mui/icons-material/ShoppingCart";
import Row from "react-bootstrap/esm/Row";
import { getError } from "../../utils";
import icon from "./icon3.svg";
import Button from "react-bootstrap/Button";
import ListGroup from "react-bootstrap/ListGroup";
import { Store } from "../../Store";

const ProductDetails = () => {
  const navigate = useNavigate();
  const params = useParams();
  const { slug } = params;
  const [selectedImage, setSelectedImage] = useState("");
  const [product, setProduct] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);
  const [visibleDescription, setVisibleDescription] = useState(false);
  const [visibleDimension, setVisibleDimension] = useState(false);
  const [visibleAssembly, setVisibleAssembly] = useState(false);
  const [visibleSchema, setVisibleSchema] = useState(false);

  const { state, dispatch: ctxDispatch } = useContext(Store);
  const { cart } = state;

  const addToCartHandler = async () => {
    ctxDispatch({
      type: "CART_ADD_ITEM",
      payload: { ...product, quantity: 1 },
    });
    navigate("/cart");
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await axios.get(`/api/products/slug/${slug}`);
        setProduct(result.data);
        setSelectedImage(result.data.images[0]);
        setLoading(false);
      } catch (err) {
        setError(getError(err));
      }
    };
    fetchData();
  }, [slug]);

  return loading ? (
    <div>Почекајте...</div>
  ) : (
    <div className="mt-3 container d-flex flex-column mb-5">
      <span style={{ color: "gray" }}>
        <a href="/" style={{ color: "grey" }}>
          Почетна
        </a>{" "}
        &gt;{" "}
        <a href="/" style={{ color: "grey" }}>
          Производи
        </a>{" "}
        &gt;
        <a href="/" style={{ color: "grey" }}>
          {product.category}
        </a>{" "}
        &gt;{" "}
        <a href="/" style={{ color: "grey" }}>
          {product.subCategory}
        </a>{" "}
        &gt;{" "}
        <a href={`/products/${product.slug}`} style={{ color: "grey" }}>
          {product.name}
        </a>
      </span>
      <div className="container d-flex">
        <div className="w-50 ">
          <img src={selectedImage} className="w-100 mt-3" />
          <Row className="mt-3 d-flex justify-content-around">
            {product.images.map((i) => (
              <img
                key={i}
                src={i}
                className="w-25"
                onClick={() => setSelectedImage(i)}
                style={{ cursor: "pointer" }}
              />
            ))}
          </Row>
        </div>
        <div className="w-50 text-left ms-5">
          <h2 className="text-center">{product.name}</h2>
          <h2 className="mt-4 fw-bold" style={{ color: "#ce0505" }}>
            {product.price}ден
          </h2>
          <div className="d-flex align-items-center gap-2">
            <img
              id="icon"
              src={icon}
              alt="10-day-delivery"
              style={{ height: "50px" }}
            ></img>
            <p className="m-0">Бесплатна достава: 10 дена</p>
          </div>
          <div className="mt-5">
            <Button
              onClick={addToCartHandler}
              className="addToCartBtn "
              variant="danger"
            >
              <ShoppingBasketIcon />
              ДОДАЈ ВО КОШНИЧКА
            </Button>
          </div>
          <div>
            <ListGroup className="mt-3" style={{ cursor: "pointer" }}>
              <ListGroup.Item
                onClick={() => setVisibleDescription(!visibleDescription)}
              >
                Опис
                {visibleDescription && (
                  <pre style={{ whiteSpace: "pre-wrap", textWrap: "balanced" }}>
                    {product.description}
                  </pre>
                )}
              </ListGroup.Item>
              {product.dimensionImage != null && (
                <ListGroup.Item
                  onClick={() => setVisibleDimension(!visibleDimension)}
                >
                  Димензии{" "}
                  {visibleDimension && (
                    <img src={product.dimensionImage} className="w-100" />
                  )}
                </ListGroup.Item>
              )}
              {product.priceAssembly > 0 && (
                <ListGroup.Item
                  onClick={() => setVisibleAssembly(!visibleAssembly)}
                >
                  Монтажа
                  {visibleAssembly && (
                    <p className="mt-3">
                      Цена за монтажа: <b>{product.priceAssembly}ден</b>
                    </p>
                  )}
                </ListGroup.Item>
              )}
              {product.schemaImage && (
                <ListGroup.Item
                  onClick={() => setVisibleSchema(!visibleSchema)}
                >
                  Шема за монтажа
                  {visibleSchema && (
                    <img src={product.schemaImage} className="w-100" />
                  )}
                </ListGroup.Item>
              )}
            </ListGroup>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
