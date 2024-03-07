import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import Image from "react-bootstrap/Image";
import Form from "react-bootstrap/Form";
import UserButton from "./Components/UserButton";
import ShoppingCartSharpIcon from "@mui/icons-material/ShoppingCartSharp";
import SearchSharpIcon from "@mui/icons-material/SearchSharp";
import logo from "./logo.png";
import "./Header.css";
import { useContext, useEffect, useState } from "react";
import { Store } from "../../Store";
import Badge from "react-bootstrap/Badge";
import ProductsDropdown from "./Components/ProductsDropdown";
import { toast } from "react-toastify";
import { getError } from "../../utils";
import axios from "axios";

const Header = () => {
  const { state, dispatch: ctxDispatch } = useContext(Store);
  const { cart, userInfo } = state;
  const [search, setSearch] = useState("");
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data } = await axios.get(`/api/products/search?text=${search}`);
        setProducts(data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, [search]);

  return (
    <Navbar collapseOnSelect expand="lg" bg="white" id="navbar">
      <Container>
        <Navbar.Brand href="/">
          <span className="flexSpan">
            <Image src={logo} />
            <h4>MebelCity</h4>
          </span>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link href="/">Почетна</Nav.Link>
            <NavDropdown title="Производи" id="collapsible-nav-dropdown">
              <ProductsDropdown />
            </NavDropdown>
            <Nav.Link href="/aboutus">За Нас</Nav.Link>
            <Nav.Link href="/contact">Контакти</Nav.Link>
          </Nav>
          <Nav className="d-flex flex-column">
            <Container className="d-flex justify-content-between">
              <UserButton />

              <Nav.Link href="/cart">
                <span className="flexSpan">
                  <ShoppingCartSharpIcon />
                  {cart.cartItems.length > 0 && (
                    <Badge pill bg="danger">
                      {cart.cartItems.reduce((a, c) => a + c.quantity, 0)}
                    </Badge>
                  )}
                </span>
              </Nav.Link>
            </Container>

            <Form className="d-flex" onSubmit={(e) => e.preventDefault()}>
              <span className="flexSpan">
                <SearchSharpIcon style={{ marginRight: "-30px", zIndex: 2 }} />
                <Form.Control
                  type="search"
                  placeholder="Барај..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="me-2"
                  aria-label="Search"
                  id="searchBar"
                />
              </span>
            </Form>
            {products.length > 0 && (
              <div
                style={{
                  border: "1px solid black",
                  position: "absolute",
                  top: "90px",
                  backgroundColor: "white",
                  zIndex: "999",
                  padding: "10px",
                }}
              >
                {products &&
                  products.map((product) => (
                    <a
                      key={product._id}
                      href={`/products/${product.slug}`}
                      style={{ textDecoration: "none", color: "black" }}
                    >
                      <div className="mt-2">
                        <span className="d-flex justify-content-start gap-3 align-items-center">
                          <img
                            src={product.images[0]}
                            style={{ height: "70px" }}
                          />
                          <p>{product.name}</p>
                        </span>
                      </div>
                    </a>
                  ))}
              </div>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Header;
