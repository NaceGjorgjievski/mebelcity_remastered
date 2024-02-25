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

const Header = () => {
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
              <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
              <NavDropdown.Item href="#action/3.2">
                Another action
              </NavDropdown.Item>
              <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item href="#action/3.4">
                Separated link
              </NavDropdown.Item>
            </NavDropdown>
            <Nav.Link href="/aboutus">За Нас</Nav.Link>
            <Nav.Link href="/contact">Контакти</Nav.Link>
          </Nav>
          <Nav className="d-flex flex-column">
            <Container className="d-flex justify-content-between">
              <UserButton />

              <Nav.Link href="#memes">
                <span className="flexSpan">
                  <ShoppingCartSharpIcon />
                </span>
              </Nav.Link>
            </Container>

            <Form className="d-flex">
              <span className="flexSpan">
                <SearchSharpIcon style={{ marginRight: "-30px", zIndex: 2 }} />
                <Form.Control
                  type="search"
                  placeholder="Барај..."
                  className="me-2"
                  aria-label="Search"
                  id="searchBar"
                />
              </span>
            </Form>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Header;
