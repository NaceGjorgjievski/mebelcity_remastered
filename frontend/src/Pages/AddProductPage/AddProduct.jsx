import Col from "react-bootstrap/esm/Col";
import Row from "react-bootstrap/esm/Row";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import DashboardMenu from "../../Components/DashboardMenu/DashboardMenu";
import { toast } from "react-toastify";
import { useContext, useEffect, useState } from "react";
import { Store } from "../../Store";
import { useNavigate } from "react-router-dom";
import { getError } from "../../utils";
import axios from "axios";

const AddProduct = () => {
  const navigate = useNavigate();
  const { state } = useContext(Store);
  const { userInfo } = state;

  useEffect(() => {
    if (!userInfo || !userInfo.role === "admin") {
      return navigate("/");
    }
  }, [userInfo, navigate]);

  const [name, setName] = useState("");
  const [slug, setSlug] = useState("");
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [subCategories, setSubCategories] = useState([]);
  const [filteredSubCategories, setFilteredSubCategories] = useState([]);
  const [selectedSubCategory, setSelectedSubCategory] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [priceAssembly, setPriceAssembly] = useState("");
  const [countInStock, setCountInStock] = useState("");
  const [images, setImages] = useState([]);
  const [dimensionImage, setDimensionImage] = useState("");
  const [schemaImage, setSchemaImage] = useState("");

  const clearFields = () => {
    setName("");
    setSlug("");
    setPrice("");
    setPriceAssembly("");
    setCountInStock("");
    setDescription("");
    setImages([]);
    setDimensionImage("");
    setSchemaImage("");
    document.getElementById("imagesInput").value = "";
    document.getElementById("dimensionImageInput").value = "";
    document.getElementById("schemaImageInput").value = "";
  };

  const addProductHandler = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("name", name);
    formData.append("slug", slug);
    formData.append("selectedCategory", selectedCategory);
    formData.append("selectedSubCategory", selectedSubCategory.subCategoryName);
    formData.append("description", description);
    formData.append("price", price);
    formData.append("priceAssembly", priceAssembly);
    formData.append("countInStock", countInStock);
    for (let i = 0; i < images.length; i++) {
      formData.append("images", images[i]);
    }
    formData.append("dimensionImage", dimensionImage);
    formData.append("schemaImage", schemaImage);
    try {
      const result = await axios.post("/api/products/add", formData);
      if (result) {
        toast.success("Производот е додаден");
        clearFields();
      }
    } catch (error) {
      toast.error(getError(error));
    }
  };

  const updateCurrentSubcategories = (selectedCat) => {
    let filtered = subCategories.filter((s) => s.category === selectedCat);
    setFilteredSubCategories(filtered);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data } = await axios.get("/api/category/getCategories");
        setCategories(data);
        setSelectedCategory(data[0].categoryName);
        const resp = await axios.get("/api/category/getSubCategories");
        setSubCategories(resp.data);
        let filtered = resp.data.filter(
          (s) => s.category === data[0].categoryName
        );
        setFilteredSubCategories(filtered);
        setSelectedSubCategory(filtered[0]);
      } catch (error) {
        toast.error(getError(error));
      }
    };
    fetchData();
  }, []);

  return (
    <Row style={{ width: "100vw" }}>
      <Col xs={2} style={{ height: "80vh" }}>
        <DashboardMenu />
      </Col>
      <Col>
        <Row className="mt-3">
          <Col style={{ textAlign: "center" }}>
            <h5>Додади Продукт</h5>
            <Form
              onSubmit={addProductHandler}
              encType="multipart/form-data"
              className="newProductFormCointainer"
            >
              <Row className="mt-4">
                <Col>
                  <Form.Group>
                    <Form.Label>Име</Form.Label>
                    <Form.Control
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      required
                    ></Form.Control>
                  </Form.Group>
                </Col>
                <Col>
                  <Form.Group>
                    <Form.Label>Слуг</Form.Label>
                    <Form.Control
                      value={slug}
                      onChange={(e) => setSlug(e.target.value)}
                      required
                    ></Form.Control>
                  </Form.Group>
                </Col>
                <Col>
                  <Form.Group>
                    <Form.Label>Категорија</Form.Label>
                    <Form.Select
                      value={selectedCategory}
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
                <Col>
                  <Form.Group>
                    <Form.Label>Подкатегорија</Form.Label>
                    <Form.Select
                      value={selectedSubCategory}
                      onChange={(e) => setSelectedSubCategory(e.target.value)}
                    >
                      {filteredSubCategories.map((c) => (
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
                    id="textArea"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    as="textarea"
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
                      value={price}
                      onChange={(e) => setPrice(e.target.value)}
                      type="number"
                      required
                    ></Form.Control>
                  </Form.Group>
                  <Form.Group style={{ marginTop: "10px" }}>
                    <Form.Label>Цена Монтажа</Form.Label>
                    <Form.Control
                      value={priceAssembly}
                      onChange={(e) => setPriceAssembly(e.target.value)}
                      type="number"
                      required
                    ></Form.Control>
                  </Form.Group>
                  <Form.Group style={{ marginTop: "10px" }}>
                    <Form.Label>Залиха</Form.Label>
                    <Form.Control
                      value={countInStock}
                      onChange={(e) => setCountInStock(e.target.value)}
                      type="number"
                      required
                    ></Form.Control>
                  </Form.Group>
                </div>
              </Row>

              <Row style={{ marginTop: "20px" }}>
                <Col>
                  <Form.Group style={{ marginTop: "10px" }}>
                    <Form.Label>Слики</Form.Label>
                    <Form.Control
                      type="file"
                      name="images"
                      id="imagesInput"
                      multiple
                      onChange={(e) => {
                        setImages(e.target.files);
                      }}
                      required
                    ></Form.Control>
                  </Form.Group>
                </Col>
                <Col>
                  <Form.Group style={{ marginTop: "10px" }}>
                    <Form.Label>Слика со димензии</Form.Label>
                    <Form.Control
                      type="file"
                      name="dimensionImage"
                      id="dimensionImageInput"
                      onChange={(e) => setDimensionImage(e.target.files[0])}
                    ></Form.Control>
                  </Form.Group>
                </Col>
                <Col>
                  <Form.Group style={{ marginTop: "10px" }}>
                    <Form.Label>Слика од шема</Form.Label>
                    <Form.Control
                      type="file"
                      name="schemaImage"
                      id="schemaImageInput"
                      onChange={(e) => setSchemaImage(e.target.files[0])}
                    ></Form.Control>
                  </Form.Group>
                </Col>
              </Row>

              <Button variant="danger" size="lg" type="submit" className="mt-3">
                Додади
              </Button>
            </Form>
          </Col>
        </Row>
      </Col>
    </Row>
  );
};

export default AddProduct;
