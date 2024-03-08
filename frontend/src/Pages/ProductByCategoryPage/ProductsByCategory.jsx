import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { getError } from "../../utils";
import Row from "react-bootstrap/esm/Row";
import Form from "react-bootstrap/Form";
import ProductCard from "../../Components/ProductCard/ProductCard";
import Pagination from "../../Components/Pagination/Pagination";
import { useMediaQuery } from "@mui/material";
import "./ProductsByCategory.css";

const ProductsByCategory = () => {
  const params = useParams();
  const { category, subCategory } = params;
  const [selectedCategory, setSelectedCategory] = useState("");
  const [order, setOrder] = useState("newest");
  const [products, setProducts] = useState([]);
  const [page, setPage] = useState(1);
  const [pages, setPages] = useState(0);

  const isSmallScreen = useMediaQuery("(max-width:536px)");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data } = await axios.get(
          `/api/category/${subCategory != "all" ? subCategory : category}`
        );
        setSelectedCategory(data);
      } catch (error) {
        toast.error(getError(error));
      }
    };
    fetchData();
  }, [category, subCategory]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data } = await axios.get(
          `/api/products/${
            selectedCategory.categoryName || selectedCategory.subCategoryName
          }?page=${page}&order=${order}`
        );
        setProducts(data.products);
        setPages(data.pages);
      } catch (error) {
        toast.error(getError(error));
      }
    };
    fetchData();
  }, [category, subCategory, order, page, selectedCategory]);

  return (
    <div
      className={`container d-flex flex-column ${
        isSmallScreen && "align-items-center"
      }`}
    >
      <h2 className="text-center mt-3">
        {selectedCategory.categoryName || selectedCategory.subCategoryName}
      </h2>
      <Row className="mt-4">
        <Form id="fff" onSubmit={(e) => e.preventDefault()}>
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
      <Row className="mt-5">
        <div id="productsGrid">
          {products.map((p) => (
            <ProductCard product={p} key={p._id} />
          ))}
        </div>
      </Row>
      <Pagination page={page} pages={pages} onClick={(p) => setPage(p)} />
    </div>
  );
};

export default ProductsByCategory;
