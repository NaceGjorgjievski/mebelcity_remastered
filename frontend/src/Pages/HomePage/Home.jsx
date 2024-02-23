import Slideshow from "../../Components/Slideshow/Slideshow";
import Image from "react-bootstrap/Image";
import icon1 from "./Images/icon1.svg";
import icon2 from "./Images/icon2.svg";
import icon3 from "./Images/icon3.svg";
import "./Home.css";
import { useEffect, useReducer, useState } from "react";
import axios from "axios";

const reducer = (state, action) => {
  switch (action.type) {
    case "FETCH_REQUEST":
      return { ...state, loading: true };
    case "FETCH_SUCCESS":
      return { ...state, products: action.payload, loading: false };
    case "FETCH_FAIL":
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
};

const Home = () => {
  const [{ loading, error, products }, dispatch] = useReducer(reducer, {
    products: [],
    loading: true,
    error: "",
  });

  //const [products, setProducts] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      dispatch({ type: "FETCH_REQUEST" });
      try {
        const result = await axios.get("/api/products");
        dispatch({ type: "FETCH_SUCCESS", payload: result.data });
        console.log(result);
      } catch (error) {
        dispatch({ type: "FETCH_FAIL", payload: error.message });
      }

      //setProducts(result.data);
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
        <h3>Најпродавани производи</h3>
        {loading ? (
          <p>Loading...</p>
        ) : error ? (
          <p>{error}</p>
        ) : (
          <p>{products[0]}</p>
        )}
        <h3>Најнови производи</h3>
      </div>
    </div>
  );
};

export default Home;
