import Nav from "react-bootstrap/Nav";
import NavDropdown from "react-bootstrap/NavDropdown";
import AccountCircleSharpIcon from "@mui/icons-material/AccountCircleSharp";
import { useContext } from "react";
import { Store } from "../../../Store";
import { useNavigate } from "react-router-dom";

const UserButton = () => {
  const navigate = useNavigate();
  const { state, dispatch: ctxDispatch } = useContext(Store);
  const { userInfo } = state;

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
          <NavDropdown.Item
            onClick={() => {
              navigate("/admin/addCategory");
            }}
          >
            Dashboard
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
