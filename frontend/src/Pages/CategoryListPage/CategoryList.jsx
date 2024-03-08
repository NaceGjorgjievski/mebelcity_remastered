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
import CategoryListItem from "./Components/CategoryListItem";
import SubCategoryListItem from "./Components/SubCategoryListItem";
import Pagination from "../../Components/Pagination/Pagination";
import { useMediaQuery } from "@mui/material";

const CategoryList = () => {
  const navigate = useNavigate();
  const { state } = useContext(Store);
  const { userInfo } = state;
  useEffect(() => {
    if (!userInfo || !userInfo.role === "admin") {
      return navigate("/");
    }
  }, [userInfo, navigate]);

  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [pages, setPages] = useState(0);
  const [categories, setCategories] = useState([]);
  const [collection, setCollection] = useState([]);
  const [refresh, setRefresh] = useState(true);
  const isMediumScreen = useMediaQuery("(max-width:920px)");

  const editCategoryHandler = async (
    categoryId,
    categoryName,
    categorySlug
  ) => {
    try {
      const result = await axios.put(`/api/category/edit/${categoryId}`, {
        categoryName,
        categorySlug,
      });
      setRefresh(true);
      if (result) toast.success("Успешно ажурирање");
    } catch (error) {
      toast.error("Грешка при ажурирање на категоријата");
    }
  };

  const editSubCategoryHandler = async (
    subCategoryId,
    subCategoryName,
    subCategorySlug,
    category
  ) => {
    try {
      const result = await axios.put(
        `/api/category/subcategory/edit/${subCategoryId}`,
        { subCategoryName, subCategorySlug, category }
      );
      if (result) {
        setRefresh(true);
        toast.success("Успешно ажурирање");
      }
    } catch (error) {
      toast.error("Грешка при ажурирање на подкатегоријата");
    }
  };

  const deleteCategoryHandler = async (categoryId) => {
    try {
      const result = await axios.delete(`/api/category/${categoryId}`);
      if (result) {
        setRefresh(true);
        toast.success("Успешно бришење");
      }
    } catch (error) {
      toast.error("Грешка при бришење");
    }
  };

  const deleteSubCategoryHandler = async (subCategoryId) => {
    try {
      const result = await axios.delete(
        `/api/category/subcategory/${subCategoryId}`
      );
      if (result) {
        setRefresh(true);
        toast.success("Успешно бришење");
      }
    } catch (error) {
      toast.error("Грешка при бришење");
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      if (refresh) {
        setRefresh(false);
      }
      try {
        const categoryResponse = await axios.get(
          `/api/category/search?page=${page}&search=${search}`
        );
        setCollection(categoryResponse.data.result);
        setPages(categoryResponse.data.pages);
      } catch (error) {
        toast.error(getError(error));
      }
    };
    fetchData();
  }, [page, search, refresh]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data } = await axios.get("/api/category/getCategories");
        setCategories(data);
      } catch (error) {
        toast.error(getError(error));
      }
    };
    fetchData();
  }, []);

  return (
    <Row style={{ width: "100vw" }}>
      {!isMediumScreen && (
        <Col xs={2}>
          <DashboardMenu />
        </Col>
      )}
      <Col>
        <Row className="mt-3">
          <Col style={{ textAlign: "center" }}>
            <h5>Категории</h5>

            <Row className="mt-4">
              <Form
                id="fff"
                className="d-flex align-items-center justify-content-start ms-4"
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
                    <Col>Слуг</Col>
                    <Col>Подкатегорија</Col>
                    <Col>Акции</Col>
                  </Row>
                </ListGroup.Item>
                {collection &&
                  collection.map((category) =>
                    category.categoryName != null ? (
                      <CategoryListItem
                        key={category._id}
                        category={category}
                        onEdit={editCategoryHandler}
                        onDelete={deleteCategoryHandler}
                      />
                    ) : (
                      <SubCategoryListItem
                        key={category._id}
                        subCategory={category}
                        categories={categories}
                        onEdit={editSubCategoryHandler}
                        onDelete={deleteSubCategoryHandler}
                      />
                    )
                  )}
              </ListGroup>
            </Row>
            <Pagination page={page} pages={pages} onClick={(p) => setPage(p)} />
          </Col>
        </Row>
      </Col>
    </Row>
  );
};

export default CategoryList;
