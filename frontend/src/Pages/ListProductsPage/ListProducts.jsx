import Col from "react-bootstrap/esm/Col";
import Row from "react-bootstrap/esm/Row";
import DashboardMenu from "../../Components/DashboardMenu/DashboardMenu";
import Form from "react-bootstrap/Form";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useContext, useEffect, useState } from "react";
import { Store } from "../../Store";
import axios from "axios";
import { getError } from "../../utils";
import SearchSharpIcon from "@mui/icons-material/SearchSharp";
import ListGroup from "react-bootstrap/ListGroup";
import ProductListItem from "./Components/ProductListItem";
import Pagination from "../../Components/Pagination/Pagination";
import { useMediaQuery } from "@mui/material";

const ListProducts = () => {
  const navigate = useNavigate();
  const { state } = useContext(Store);
  const { userInfo } = state;
  const isMediumScreen = useMediaQuery("(max-width:920px)");
  const isSmallScreen = useMediaQuery("(max-width:768px)");

  useEffect(() => {
    if (!userInfo || !userInfo.role === "admin") {
      return navigate("/");
    }
  }, [userInfo, navigate]);

  const [search, setSearch] = useState("");
  const [categories, setCategories] = useState([]);
  const [subCategories, setSubCategories] = useState([]);
  const [category, setCategory] = useState("all");
  const [subCategory, setSubCategory] = useState("all");
  const [order, setOrder] = useState("newest");
  const [page, setPage] = useState(1);
  const [pages, setPages] = useState(0);
  const [products, setProducts] = useState([]);

  const deleteProduct = async (productId) => {
    try {
      await axios.delete(`/api/products/${productId}`);
      setProducts(products.filter((p) => p._id !== productId));
    } catch (err) {
      toast.error(getError(err));
    }
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

  useEffect(() => {
    const fetchData = async () => {
      try {
        const productsResponse = await axios.get(
          `/api/products?page=${page}&search=${search}&category=${category}&subCategory=${subCategory}&order=${order}`
        );
        setProducts(productsResponse.data.products);
        setPages(productsResponse.data.pages);
      } catch (error) {
        toast.error(getError(error));
      }
    };
    fetchData();
  }, [category, order, page, search, subCategory]);

  console.log(isSmallScreen);

  return (
    <Row>
      {!isMediumScreen && (
        <Col xs={2}>
          <DashboardMenu />
        </Col>
      )}
      <Col>
        <Row className="mt-3">
          <Col className="text-center">
            <h5>Производи</h5>

            <Row className="mt-4">
              <Form
                id="fff"
                className={`d-flex justify-content-around align-items-center ${
                  isSmallScreen && "flex-column"
                }`}
                onSubmit={(e) => e.preventDefault()}
              >
                <Form.Group>
                  <span className="flexSpan">
                    <SearchSharpIcon
                      style={{ marginRight: "-30px", zIndex: 2 }}
                    />
                    <Form.Control
                      type="search"
                      placeholder="Барај..."
                      className="me-2"
                      value={search}
                      onChange={(e) => setSearch(e.target.value)}
                      aria-label="Search"
                      id="searchBar"
                    />
                  </span>
                </Form.Group>
                <Form.Group>
                  <Form.Select
                    value={category}
                    onChange={(e) => {
                      setCategory(e.target.value);
                      setSubCategory("all");
                    }}
                  >
                    <option value="all">Категорија</option>
                    {categories.map((c) => (
                      <option key={c.categoryName} value={c.categoryName}>
                        {c.categoryName}
                      </option>
                    ))}
                  </Form.Select>
                </Form.Group>
                <Form.Group>
                  <Form.Select
                    value={subCategory}
                    onChange={(e) => {
                      setSubCategory(e.target.value);
                    }}
                  >
                    <option value="all">Подкатегорија</option>
                    {subCategories
                      .filter((s) => s.category === category)
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
                <Form.Group>
                  <Form.Select
                    value={order}
                    onChange={(e) => setOrder(e.target.value)}
                  >
                    <option value={"newest"}>Сортирај по цена</option>
                    <option value={"lowFirst"}>Од ниска кон висока</option>
                    <option value={"highFirst"}>Од висока кон ниска</option>
                  </Form.Select>
                </Form.Group>
              </Form>
            </Row>
            <Row>
              <ListGroup
                id="filteredProductsContainer"
                variant="success"
                style={{ width: "95%", margin: "auto", marginTop: "20px" }}
              >
                <ListGroup.Item>
                  <Row className="fw-bold">
                    <Col>Име</Col>
                    <Col>Категорија</Col>
                    <Col>Подкатегорија</Col>
                    {!isSmallScreen && <Col>Залиха</Col>}
                    {!isSmallScreen && <Col>Цена</Col>}

                    <Col>Акции</Col>
                  </Row>
                </ListGroup.Item>
                {products &&
                  products.map((product) => (
                    <ProductListItem
                      key={product.name}
                      product={product}
                      onDelete={deleteProduct}
                    />
                  ))}
              </ListGroup>
            </Row>
            <Pagination page={page} pages={pages} onClick={(p) => setPage(p)} />
          </Col>
        </Row>
      </Col>
    </Row>
  );
};

export default ListProducts;
