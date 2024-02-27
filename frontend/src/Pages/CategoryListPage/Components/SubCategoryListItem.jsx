import ListGroup from "react-bootstrap/ListGroup";
import Col from "react-bootstrap/esm/Col";
import Row from "react-bootstrap/esm/Row";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { useState } from "react";

const SubCategoryListItem = ({ subCategory, categories, onDelete, onEdit }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [subCategoryName, setSubCategoryName] = useState(
    subCategory.subCategoryName
  );
  const [subCategorySlug, setSubCategorySlug] = useState(
    subCategory.subCategorySlug
  );
  const [category, setCategory] = useState(subCategory.category);

  return (
    <ListGroup.Item>
      {isEditing ? (
        <Row className="align-items-center">
          <Col>
            <Form.Control
              type="search"
              className="me-2"
              value={subCategoryName}
              onChange={(e) => setSubCategoryName(e.target.value)}
              aria-label="Search"
            />
          </Col>
          <Col>
            <Form.Control
              type="search"
              className="me-2"
              value={subCategorySlug}
              onChange={(e) => setSubCategorySlug(e.target.value)}
              aria-label="Search"
            />
          </Col>
          <Col>
            <Form.Select
              id="selectContainer"
              value={category}
              onChange={(e) => {
                setCategory(e.target.value);
              }}
            >
              {categories
                .filter((c) => c.categoryName != null)
                .map((c) => (
                  <option key={c.categoryName} value={c.categoryName}>
                    {c.categoryName}
                  </option>
                ))}
              ;
            </Form.Select>
          </Col>
          <Col className="d-flex justify-content-around">
            <Button
              onClick={() => {
                onEdit(
                  subCategory._id,
                  subCategoryName,
                  subCategorySlug,
                  category
                );
                setIsEditing(false);
              }}
            >
              Потврди
            </Button>
            <Button onClick={() => setIsEditing(false)}>Откажи</Button>
          </Col>
        </Row>
      ) : (
        <Row className="align-items-center">
          <Col>{subCategory.subCategoryName}</Col>
          <Col>{subCategory.subCategorySlug}</Col>
          <Col>{subCategory.category}</Col>
          <Col className="d-flex justify-content-around">
            <Button onClick={() => setIsEditing(true)}>Измени</Button>
            <Button
              variant="danger"
              className="ms-3"
              onClick={() => onDelete(subCategory._id)}
            >
              Избриши
            </Button>
          </Col>
        </Row>
      )}
    </ListGroup.Item>
  );
};

export default SubCategoryListItem;
