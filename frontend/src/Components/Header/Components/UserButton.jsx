import Nav from "react-bootstrap/Nav";
import NavDropdown from "react-bootstrap/NavDropdown";
import AccountCircleSharpIcon from "@mui/icons-material/AccountCircleSharp";
import { useContext } from "react";
import { Store } from "../../../Store";
import { useNavigate } from "react-router-dom";
import { useMediaQuery } from "@mui/material";

const UserButton = () => {
  const navigate = useNavigate();
  const { state, dispatch: ctxDispatch } = useContext(Store);
  const { userInfo } = state;
  const isSmallScreen = useMediaQuery("(max-width:768px)");

  const signoutHandler = () => {
    ctxDispatch({ type: "USER_SIGNOUT" });
    localStorage.removeItem("userInfo");
    localStorage.removeItem("shippingAddress");
    localStorage.removeItem("paymentMethod");
    window.location.href = "/login";
  };

  if (userInfo) {
    return (
      <NavDropdown
        id="basic-nav-dropdown"
        title={
          <span className="flexSpan">
            <AccountCircleSharpIcon />
            <p style={{ marginBottom: 3 }}>{userInfo.firstName}</p>
          </span>
        }
      >
        <NavDropdown.Item
          onClick={() => {
            navigate("/profile");
          }}
        >
          Профил
        </NavDropdown.Item>

        {userInfo.role === "customer" ? (
          <NavDropdown.Item
            onClick={() => {
              navigate("/orderhistory");
            }}
          >
            Нарачки
          </NavDropdown.Item>
        ) : (
          !isSmallScreen && (
            <NavDropdown.Item
              onClick={() => {
                navigate("/admin/addCategory");
              }}
            >
              Dashboard
            </NavDropdown.Item>
          )
        )}
        {isSmallScreen && userInfo.role === "admin" && (
          <NavDropdown.Item
            onClick={() => {
              navigate("/admin/addProduct");
            }}
          >
            Додади нов производ
          </NavDropdown.Item>
        )}
        {isSmallScreen && userInfo.role === "admin" && (
          <NavDropdown.Item
            onClick={() => {
              navigate("/admin/addCategory");
            }}
          >
            Додади категорија
          </NavDropdown.Item>
        )}
        {isSmallScreen && userInfo.role === "admin" && (
          <NavDropdown.Item
            onClick={() => {
              navigate("/admin/products");
            }}
          >
            Производи
          </NavDropdown.Item>
        )}
        {isSmallScreen && userInfo.role === "admin" && (
          <NavDropdown.Item
            onClick={() => {
              navigate("/admin/categories");
            }}
          >
            Категории
          </NavDropdown.Item>
        )}
        {isSmallScreen && userInfo.role === "admin" && (
          <NavDropdown.Item
            onClick={() => {
              navigate("/admin/orders");
            }}
          >
            Нарачки
          </NavDropdown.Item>
        )}
        <NavDropdown.Divider />
        <NavDropdown.Item onClick={signoutHandler}>Одјави се</NavDropdown.Item>
      </NavDropdown>
    );
  }
  return (
    <Nav.Link href="/login">
      <span className="flexSpan">
        <AccountCircleSharpIcon />
        Најави се
      </span>
    </Nav.Link>
  );
};

export default UserButton;
