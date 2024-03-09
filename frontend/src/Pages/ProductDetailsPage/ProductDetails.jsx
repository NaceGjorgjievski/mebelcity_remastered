import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import ShoppingBasketIcon from "@mui/icons-material/ShoppingCart";
import Row from "react-bootstrap/esm/Row";
import Col from "react-bootstrap/esm/Col";
import { getError } from "../../utils";
import icon from "./icon3.svg";
import Button from "react-bootstrap/Button";
import ListGroup from "react-bootstrap/ListGroup";
import { Store } from "../../Store";
import "./ProductDetails.css";
import { toast } from "react-toastify";

const ProductDetails = () => {
  const navigate = useNavigate();
  const params = useParams();
  const { slug } = params;
  const [selectedImage, setSelectedImage] = useState("");
  const [product, setProduct] = useState("");
  const [loading, setLoading] = useState(true);
  const [visibleDescription, setVisibleDescription] = useState(false);
  const [visibleDimension, setVisibleDimension] = useState(false);
  const [visibleAssembly, setVisibleAssembly] = useState(false);
  const [visibleSchema, setVisibleSchema] = useState(false);
  const [categoryInfo, setCategoryInfo] = useState("");

  const { dispatch: ctxDispatch } = useContext(Store);

  const addToCartHandler = async () => {
    if (product.countInStock > 0) {
      ctxDispatch({
        type: "CART_ADD_ITEM",
        payload: { ...product, quantity: 1 },
      });
      navigate("/cart");
    } else {
      toast.error("Продуктот го нема на залиха");
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await axios.get(`/api/products/slug/${slug}`);
        setProduct(result.data);
        setSelectedImage(result.data.images[0]);
        setLoading(false);
      } catch (err) {
        toast(getError(err));
      }
    };
    fetchData();
  }, [slug]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data } = await axios.get(
          `/api/category/${product.category}/${product.subCategory}`
        );
        setCategoryInfo(data);
      } catch (err) {
        console.log(getError(err));
      }
    };
    if (product) fetchData();
  }, [product]);

  return loading ? (
    <div>Почекајте...</div>
  ) : (
    <div className="mt-3 container d-flex flex-column mb-5">
      <span id="navigationMenuSpan">
        <a href="/">Почетна</a> &gt; <a href="/">Производи</a> &gt;
        <a href={`/products/${categoryInfo.categorySlug}/all`}>
          {product.category}
        </a>{" "}
        &gt;{" "}
        <a
          href={`/products/${categoryInfo.categorySlug}/${categoryInfo.subCategorySlug}`}
        >
          {product.subCategory}
        </a>{" "}
        &gt; <a href={`/products/${product.slug}`}>{product.name}</a>
      </span>
      <Row className="container">
        <Col xs={12} lg={6}>
          <img src={selectedImage} className="w-100 mt-3" />
          <Row className="mt-3 d-flex justify-content-around">
            {product.images.map((i) => (
              <img
                key={i}
                src={i}
                className="w-25 pointable"
                onClick={() => setSelectedImage(i)}
              />
            ))}
          </Row>
        </Col>
        <Col xs={12} lg={5} className=" text-left">
          <h2 className="text-center">{product.name}</h2>
          <h2 className="mt-4 fw-bold customRed">{product.price}ден</h2>
          <div className="d-flex align-items-center gap-2">
            <img id="icon" src={icon} alt="10-day-delivery"></img>
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
            <ListGroup className="mt-3" id="productInfoList">
              <ListGroup.Item
                onClick={() => setVisibleDescription(!visibleDescription)}
              >
                Опис
                {visibleDescription && (
                  <pre id="descriptionText">{product.description}</pre>
                )}
              </ListGroup.Item>
              {product.dimensionImage != null && (
                <ListGroup.Item
                  onClick={() => setVisibleDimension(!visibleDimension)}
                >
                  Димензии{" "}
                  {visibleDimension && (
                    <a href={product.dimensionImage}>
                      <img src={product.dimensionImage} className="w-100" />
                    </a>
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
                  className="mb-4"
                  onClick={() => setVisibleSchema(!visibleSchema)}
                >
                  Шема за монтажа
                  {visibleSchema && (
                    <a href={product.schemaImage}>
                      <img src={product.schemaImage} className="w-100" />
                    </a>
                  )}
                </ListGroup.Item>
              )}
            </ListGroup>
          </div>
        </Col>
      </Row>
    </div>
  );
};

export default ProductDetails;
