import Col from "react-bootstrap/esm/Col";
import Row from "react-bootstrap/esm/Row";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import DashboardMenu from "../../Components/DashboardMenu/DashboardMenu";
import { toast } from "react-toastify";
import { useContext, useEffect, useReducer, useState } from "react";
import { Store } from "../../Store";
import { useNavigate, useParams } from "react-router-dom";
import { getError } from "../../utils";
import axios from "axios";
import { useMediaQuery } from "@mui/material";
import LoadingBox from "../../Components/LoadingBox/LoadingBox";

const reducer = (state, action) => {
  switch (action.type) {
    case "FETCH_REQUEST":
      return { ...state, loading: true };
    case "FETCH_SUCCESS":
      return { ...state, product: action.payload, loading: false };
    case "FETCH_FAIL":
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
};

const EditProduct = () => {
  const navigate = useNavigate();
  const { state } = useContext(Store);
  const { userInfo } = state;
  const isSmallScreen = useMediaQuery("(max-width:768px)");

  useEffect(() => {
    if (!userInfo || !userInfo.role === "admin") {
      return navigate("/");
    }
  }, [userInfo, navigate]);

  const params = useParams();
  const { slug } = params;

  const [{ loading, error, product }, dispatch] = useReducer(reducer, {
    product: [],
    loading: true,
    error: "",
  });

  useEffect(() => {
    const fetchData = async () => {
      dispatch({ type: "FETCH_REQUEST" });
      try {
        const result = await axios.get(`/api/products/slug/${slug}`);
        dispatch({ type: "FETCH_SUCCESS", payload: result.data });
      } catch (err) {
        dispatch({ type: "FETCH_FAIL", payload: err.message });
      }
    };
    fetchData();
  }, [slug]);

  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [subCategories, setSubCategories] = useState([]);
  const [selectedSubCategory, setSelectedSubCategory] = useState("");

  const submitHandler = async (e) => {
    e.preventDefault();
    let name = document.getElementById("name").value;
    let slug = document.getElementById("slug").value;
    let price = document.getElementById("price").value;
    let priceAssembly = document.getElementById("priceAssembly").value;
    let countInStock = document.getElementById("countInStock").value;
    let description = document.getElementById("description").value;
    let category = selectedCategory || product.category;
    let subCategory = selectedSubCategory || product.subCategory;
    try {
      const { data } = await axios.put(`/api/products/edit/${product._id}`, {
        name,
        slug,
        category,
        subCategory,
        description,
        price,
        priceAssembly,
        countInStock,
      });
      toast.success("Успешно ажурирање");
    } catch (err) {
      dispatch({ type: "FETCH_FAIL" });
      toast.error("Грешка");
    }
  };

  const updateCurrentSubcategories = (selectedCat) => {
    let filtered = subCategories.filter((s) => s.category === selectedCat);
    setSelectedSubCategory(filtered[0]);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data } = await axios.get("/api/category/getCategories");
        setCategories(data);
        const resp = await axios.get("/api/category/getSubCategories");
        setSubCategories(resp.data);
      } catch (error) {
        toast.error(getError(error));
      }
    };
    fetchData();
  }, []);

  return loading ? (
    <LoadingBox />
  ) : error ? (
    <h3>Настана грешка, ве молиме обидете се повторно</h3>
  ) : (
    <Row>
      {!isSmallScreen && (
        <Col xs={2}>
          <DashboardMenu />
        </Col>
      )}

      <Col>
        <Row className="mt-3">
          <Col style={{ textAlign: "center" }}>
            <h5>Ажурирај Продукт</h5>
            <Form onSubmit={submitHandler} className="newProductFormCointainer">
              <Row className="mt-4">
                <Col xs={12} sm={3}>
                  <Form.Group>
                    <Form.Label>Име</Form.Label>
                    <Form.Control
                      id="name"
                      defaultValue={product.name}
                      required
                    ></Form.Control>
                  </Form.Group>
                </Col>
                <Col xs={12} sm={3}>
                  <Form.Group>
                    <Form.Label>Слуг</Form.Label>
                    <Form.Control
                      id="slug"
                      defaultValue={product.slug}
                      required
                    ></Form.Control>
                  </Form.Group>
                </Col>
                <Col xs={12} sm={3}>
                  <Form.Group>
                    <Form.Label>Категорија</Form.Label>
                    <Form.Select
                      value={selectedCategory || product.category}
                      onChange={(e) => {
                        setSelectedCategory(e.target.value);
                        updateCurrentSubcategories(e.target.value);
                      }}
                    >
                      {categories.map((c) => (
                        <option key={c.categoryName} value={c.categoryName}>
                          {c.categoryName}
                        </option>
                      ))}
                    </Form.Select>
                  </Form.Group>
                </Col>
                <Col xs={12} sm={3}>
                  <Form.Group>
                    <Form.Label>Подкатегорија</Form.Label>
                    <Form.Select
                      value={selectedSubCategory || product.subCategory}
                      onChange={(e) => setSelectedSubCategory(e.target.value)}
                    >
                      {subCategories
                        .filter((c) => {
                          let category = selectedCategory || product.category;
                          return c.category == category;
                        })
                        .map((c) => (
                          <option
                            key={c.subCategoryName}
                            value={c.subCategoryName}
                          >
                            {c.subCategoryName}
                          </option>
                        ))}
                    </Form.Select>
                  </Form.Group>
                </Col>
              </Row>
              <Row>
                <Form.Group style={{ width: "60%", marginTop: "20px" }}>
                  <Form.Label>Опис</Form.Label>
                  <Form.Control
                    style={{ height: "85%", resize: "none" }}
                    id="description"
                    as="textarea"
                    defaultValue={product.description}
                    required
                  ></Form.Control>
                </Form.Group>
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: "center",
                    width: "40%",
                  }}
                >
                  <Form.Group style={{ marginTop: "20px" }}>
                    <Form.Label>Цена</Form.Label>
                    <Form.Control
                      id="price"
                      defaultValue={product.price}
                      type="number"
                      required
                    ></Form.Control>
                  </Form.Group>
                  <Form.Group style={{ marginTop: "10px" }}>
                    <Form.Label>Цена Монтажа</Form.Label>
                    <Form.Control
                      id="priceAssembly"
                      defaultValue={product.priceAssembly}
                      type="number"
                      required
                    ></Form.Control>
                  </Form.Group>
                  <Form.Group style={{ marginTop: "10px" }}>
                    <Form.Label>Залиха</Form.Label>
                    <Form.Control
                      id="countInStock"
                      defaultValue={product.countInStock}
                      type="number"
                      required
                    ></Form.Control>
                  </Form.Group>
                </div>
              </Row>

              <Button
                variant="danger"
                size="lg"
                type="submit"
                className="mt-5 mb-5"
              >
                Ажурирај
              </Button>
            </Form>
          </Col>
        </Row>
      </Col>
    </Row>
  );
};
export default EditProduct;
