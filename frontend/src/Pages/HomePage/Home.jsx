import Slideshow from "../../Components/Slideshow/Slideshow";
import Image from "react-bootstrap/Image";
import icon1 from "./Images/icon1.svg";
import icon2 from "./Images/icon2.svg";
import icon3 from "./Images/icon3.svg";
import "./Home.css";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import axios from "axios";
import ProductCard from "../../Components/ProductCard/ProductCard";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import Container from "react-bootstrap/esm/Container";
import { useMediaQuery } from "@mui/material";

const Home = () => {
  const [popularProducts, setPopularProducts] = useState([]);
  const [popularPage, setPopularPage] = useState(0);
  const isSmallScreen = useMediaQuery("(max-width:768px)");
  const isExtraSmallScreen = useMediaQuery("(max-width:410px)");

  const [newestProducts, setNewestProducts] = useState([]);
  const [newestPage, setNewestPage] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data } = await axios.get(`/api/products/popular`);
        setPopularProducts(data);
        const resp = await axios.get("/api/products/newest");
        setNewestProducts(resp.data);
      } catch (error) {
        toast.error("Грешка при превземање продукти");
      }
    };
    fetchData();
  }, []);

  const [iconMessage, setIconMessage] = useState(
    "Бесплатна достава за нарачки над 1500 ден."
  );

  const handleIconClick = (e, message) => {
    setIconMessage(message);
    const prevActiveDiv = document.getElementsByClassName("activeIcon")[0];
    prevActiveDiv.classList.remove("activeIcon");
    const activeDiv = e.currentTarget;
    activeDiv.classList.add("activeIcon");
  };

  return (
    <div>
      <Slideshow />
      {!isExtraSmallScreen && (
        <Container fluid={isSmallScreen}>
          <div id="iconHolder">
            <div
              className="iconContainer activeIcon"
              onClick={(e) =>
                handleIconClick(e, "Бесплатна достава за нарачки над 1500 ден.")
              }
            >
              <Image src={icon1} height="75%" className="icon" />
              <p className="text-uppercase">Бесплатна достава</p>
            </div>
            <div
              className="iconContainer"
              onClick={(e) =>
                handleIconClick(
                  e,
                  "Ние можеме да го монтираме мебелот наместо Вас – брзо, лесно и чисто."
                )
              }
            >
              <Image src={icon2} height="75%" className="icon" />
              <p className="text-uppercase">Монтажа</p>
            </div>
            <div
              className="iconContainer"
              onClick={(e) =>
                handleIconClick(e, "Доставуваме над 1000 производи до 10 дена.")
              }
            >
              <Image src={icon3} height="75%" className="icon" />
              <p className="text-uppercase">Брза достава</p>
            </div>
          </div>
          <div id="iconTextContainer">{iconMessage}</div>
        </Container>
      )}
      <Container fluid={isSmallScreen}>
        <h3 className="mt-4">Најпродавани производи</h3>
        <div className="d-flex align-items-center">
          {!isSmallScreen && (
            <div
              onClick={() => {
                setPopularPage(popularPage == 0 ? 2 : popularPage - 1);
              }}
            >
              <ArrowBackIosIcon className="slideArrows" />
            </div>
          )}
          <div className="d-flex justify-content-around flex-grow-1 flex-wrap row-gap-4">
            {popularProducts && isSmallScreen
              ? popularProducts.map((p) => (
                  <ProductCard key={p._id} product={p} />
                ))
              : popularProducts
                  .slice(popularPage * 4, popularPage * 4 + 4)
                  .map((p) => <ProductCard key={p._id} product={p} />)}
          </div>
          {!isSmallScreen && (
            <div
              onClick={() => {
                setPopularPage(popularPage == 2 ? 0 : popularPage + 1);
              }}
            >
              <ArrowForwardIosIcon className="slideArrows" />
            </div>
          )}
        </div>
        <h3 className="mt-4">Најнови производи</h3>
        <div className="d-flex align-items-center">
          {!isSmallScreen && (
            <div
              onClick={() => {
                setNewestPage(newestPage == 0 ? 2 : newestPage - 1);
              }}
            >
              <ArrowBackIosIcon className="slideArrows" />
            </div>
          )}

          <div className="d-flex justify-content-around flex-grow-1 flex-wrap row-gap-4 mb-4">
            {newestProducts && isSmallScreen
              ? newestProducts.map((p) => (
                  <ProductCard key={p._id} product={p} />
                ))
              : newestProducts
                  .slice(newestPage * 4, newestPage * 4 + 4)
                  .map((p) => <ProductCard key={p._id} product={p} />)}
          </div>
          {!isSmallScreen && (
            <div
              onClick={() => {
                setNewestPage(newestPage == 2 ? 0 : newestPage + 1);
              }}
            >
              <ArrowForwardIosIcon className="slideArrows" />
            </div>
          )}
        </div>
      </Container>
    </div>
  );
};

export default Home;
