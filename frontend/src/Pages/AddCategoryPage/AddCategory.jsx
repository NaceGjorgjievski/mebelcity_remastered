import Col from "react-bootstrap/esm/Col";
import Row from "react-bootstrap/esm/Row";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { useNavigate } from "react-router-dom";
import DashboardMenu from "../../Components/DashboardMenu/DashboardMenu";
import { useContext, useEffect, useState } from "react";
import { Store } from "../../Store";
import axios from "axios";
import { getError } from "../../utils";
import { toast } from "react-toastify";
import { useMediaQuery } from "@mui/material";

const AddCategory = () => {
  const navigate = useNavigate();
  const { state } = useContext(Store);
  const { userInfo } = state;

  useEffect(() => {
    if (!userInfo || !userInfo.role === "admin") {
      return navigate("/");
    }
  }, [userInfo, navigate]);

  const isSmallScreen = useMediaQuery("(max-width:768px)");
  const [category, setCategory] = useState("");
  const [categorySlug, setCategorySlug] = useState("");
  const [categories, setCategories] = useState([]);
  const [subCategory, setSubCategory] = useState("");
  const [subCategorySlug, setSubCategorySlug] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");

  const addCategoryHandler = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post("/api/category/addCategory", {
        category,
        categorySlug,
      });
      setCategories([...categories, data.category]);
      toast.success("Категоријата е додадена");
      setCategory("");
      setCategorySlug("");
    } catch (err) {
      toast.error(getError(err));
    }
  };

  const addSubCategoryHandler = async (e) => {
    e.preventDefault();
    try {
      await axios.post("/api/category/addSubCategory", {
        subCategory,
        subCategorySlug,
        selectedCategory,
      });
      toast.success("Подкатегоријата е додадена");
      setSubCategory("");
      setSubCategorySlug("");
    } catch (err) {
      toast.error(getError(err), { position: "bottom-center" });
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data } = await axios.get("/api/category/getCategories");
        setCategories(data);
        setSelectedCategory(data[0].categoryName);
      } catch (error) {
        toast.error(getError(error));
      }
    };
    fetchData();
  }, []);

  return (
    <Row>
      {!isSmallScreen && (
        <Col xs={2}>
          <DashboardMenu />
        </Col>
      )}
      <Col>
        <Row className="mt-3" style={{ height: "calc(100vh - 120px)" }}>
          <Col style={{ textAlign: "center" }} xs={12} sm={6}>
            <h5>Додади Категорија</h5>
            <Form style={{ marginTop: "30px" }} onSubmit={addCategoryHandler}>
              <Form.Group controlId="category">
                <Form.Control
                  type="text"
                  placeholder="Категорија"
                  required
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                />
              </Form.Group>
              <Form.Group
                controlId="categorySlug"
                style={{ marginTop: "20px" }}
              >
                <Form.Control
                  type="text"
                  placeholder="slug"
                  required
                  value={categorySlug}
                  onChange={(e) => setCategorySlug(e.target.value)}
                />
              </Form.Group>

              <Button variant="danger" size="lg" type="submit" className="mt-3">
                Додади категорија
              </Button>
            </Form>
          </Col>
          <Col className={`text-center ${isSmallScreen && "mt-3"}`}>
            <h5>Додади Подкатегорија</h5>
            <Form
              className="formCointainer"
              onSubmit={addSubCategoryHandler}
              style={{ marginTop: "30px" }}
            >
              <Form.Group>
                <Form.Select
                  id="selectContainer"
                  value={selectedCategory}
                  onChange={(e) => {
                    setSelectedCategory(e.target.value);
                  }}
                >
                  {categories.map((c) => (
                    <option key={c.categoryName} value={c.categoryName}>
                      {c.categoryName}
                    </option>
                  ))}
                  ;
                </Form.Select>
              </Form.Group>
              <Form.Group controlId="subcategory" style={{ marginTop: "20px" }}>
                <Form.Control
                  type="text"
                  placeholder="Подкатегорија"
                  required
                  value={subCategory}
                  onChange={(e) => setSubCategory(e.target.value)}
                />
              </Form.Group>
              <Form.Group
                controlId="subcategorySlug"
                style={{ marginTop: "20px" }}
              >
                <Form.Control
                  type="text"
                  placeholder="slug"
                  required
                  value={subCategorySlug}
                  onChange={(e) => setSubCategorySlug(e.target.value)}
                />
              </Form.Group>

              <Button variant="danger" size="lg" type="submit" className="mt-3">
                Додади подкатегорија
              </Button>
            </Form>
          </Col>
        </Row>
      </Col>
    </Row>
  );
};

export default AddCategory;
