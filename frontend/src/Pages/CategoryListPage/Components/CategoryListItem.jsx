import ListGroup from "react-bootstrap/ListGroup";
import Col from "react-bootstrap/esm/Col";
import Row from "react-bootstrap/esm/Row";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { useState } from "react";

const CategoryListItem = ({ category, onDelete, onEdit }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [categoryName, setCategoryName] = useState(category.categoryName);
  const [categorySlug, setCategorySlug] = useState(category.categorySlug);

  return (
    <ListGroup.Item>
      {isEditing ? (
        <Row className="align-items-center">
          <Col>
            <Form.Control
              type="search"
              className="me-2"
              value={categoryName}
              onChange={(e) => setCategoryName(e.target.value)}
              aria-label="Search"
            />
          </Col>
          <Col>
            <Form.Control
              type="search"
              className="me-2"
              value={categorySlug}
              onChange={(e) => setCategorySlug(e.target.value)}
              aria-label="Search"
            />
          </Col>
          <Col>{/* Категорија */}</Col>
          <Col className="d-flex justify-content-around">
            <Button
              onClick={() => {
                onEdit(category._id, categoryName, categorySlug);
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
          <Col>{category.categoryName}</Col>
          <Col>{category.categorySlug}</Col>
          <Col>Категорија</Col>
          <Col className="d-flex justify-content-around">
            <Button onClick={() => setIsEditing(true)}>Измени</Button>
            <Button
              variant="danger"
              className="ms-3"
              onClick={() => onDelete(category._id)}
            >
              Избриши
            </Button>
          </Col>
        </Row>
      )}
    </ListGroup.Item>
  );
};

export default CategoryListItem;
