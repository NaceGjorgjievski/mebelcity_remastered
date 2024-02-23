import Col from "react-bootstrap/esm/Col";
import Row from "react-bootstrap/esm/Row";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import DashboardMenu from "../../Components/DashboardMenu/DashboardMenu";

const AddCategory = () => {
  return (
    <Row style={{ width: "100vw" }}>
      <Col xs={3} style={{ height: "80vh" }}>
        <DashboardMenu />
      </Col>
      <Col>
        <Row className="mt-3">
          <Col style={{ textAlign: "center" }}>
            <h5>Додади Категорија</h5>
            <Form style={{ marginTop: "30px" }}>
              <Form.Group controlId="category">
                <Form.Control
                  type="text"
                  placeholder="Категорија"
                  required
                  //onChange={(e) => setCategory(e.target.value)}
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
                  //onChange={(e) => setCategorySlug(e.target.value)}
                />
              </Form.Group>

              <Button variant="danger" size="lg" type="submit" className="mt-3">
                Додади категорија
              </Button>
            </Form>
          </Col>
          <Col style={{ textAlign: "center" }}>
            <h5>Додади Подкатегорија</h5>
            <Form
              className="formCointainer"
              //onSubmit={addSubCategoryHandler}
              style={{ marginTop: "30px" }}
            >
              <Form.Group>
                <Form.Select
                  id="selectContainer"
                  //value={category}
                  //onChange={(e) => {
                  //  setCategory(e.target.value);
                  //}}
                ></Form.Select>
              </Form.Group>
              <Form.Group controlId="subcategory" style={{ marginTop: "20px" }}>
                <Form.Control
                  type="text"
                  placeholder="Подкатегорија"
                  required
                  //onChange={(e) => setSubCategory(e.target.value)}
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
                  //onChange={(e) => setSubCategorySlug(e.target.value)}
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
