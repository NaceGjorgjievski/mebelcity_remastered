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

const Home = () => {
  const [popularProducts, setPopularProducts] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data } = await axios.get(`/api/products/popular`);
        setPopularProducts(data);
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
      <div className="container">
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
      </div>
      <div className="container">
        <h3 className="mt-4">Најпродавани производи</h3>
        <div className="d-flex align-items-center">
          <ArrowBackIosIcon style={{ fontSize: "2.5rem", cursor: "pointer" }} />
          {popularProducts &&
            popularProducts.map((p) => <ProductCard key={p._id} product={p} />)}
          <ArrowForwardIosIcon
            style={{ fontSize: "2.5rem", cursor: "pointer" }}
          />
        </div>
        <h3 className="mt-4">Најнови производи</h3>
      </div>
    </div>
  );
};

export default Home;
