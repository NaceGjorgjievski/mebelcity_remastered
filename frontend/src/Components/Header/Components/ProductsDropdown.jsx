import axios from "axios";
import { useEffect, useState } from "react";
import { getError } from "../../../utils";
import { toast } from "react-toastify";
import "../Header.css";
import LoadingBox from "../../LoadingBox/LoadingBox";
import { useMediaQuery } from "@mui/material";

const ProductsDropdown = () => {
  const [categories, setCategories] = useState([]);
  const [subCategories, setSubCategories] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const isSmallScreen = useMediaQuery("(max-width:768px)");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data } = await axios.get("/api/category/getCategories");
        setCategories(data);
        const resp = await axios.get("/api/category/getSubCategories");
        setSubCategories(resp.data);
        setIsLoading(false);
      } catch (error) {
        toast.error(getError(error));
      }
    };
    fetchData();
  }, []);

  return isLoading ? (
    <LoadingBox />
  ) : (
    <div id={`${!isSmallScreen && "dropdownGrid"}`}>
      {categories.map((category, index) => (
        <div key={index} style={{ padding: "10px" }}>
          <a
            className="menuItemLink"
            href={`/products/${category.categorySlug}/all`}
          >
            <b>{category.categoryName}</b>
          </a>

          {subCategories
            .filter((s) => s.category === category.categoryName)
            .map((s) => (
              <li key={s._id}>
                <a
                  className="menuItemLink"
                  href={`/products/${category.categorySlug}/${s.subCategorySlug}`}
                >
                  {s.subCategoryName}
                </a>
              </li>
            ))}
        </div>
      ))}
    </div>
  );
};

export default ProductsDropdown;
