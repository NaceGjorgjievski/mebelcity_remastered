import { Link } from "react-router-dom";

const linkStyle = {
  textDecoration: "none",
  width: "100%",
  fontSize: 24,
  color: "white",
  textAlign: "center",
  marginTop: "5px",
};

const DashboardMenu = () => {
  const menuStyle = {
    backgroundColor: "red",
    height: "100%",
    display: "flex",
    flexDirection: "column",
    justifyContent: "flex-start",
  };
  return (
    <div style={menuStyle}>
      <Link to={"/admin/addProduct"} style={linkStyle}>
        <div className="dashboard-btn" to="/admin/addProduct">
          Додади нов производ
        </div>
      </Link>
      <Link to={"/admin/addCategory"} style={linkStyle}>
        <div className="dashboard-btn">Додади категорија</div>
      </Link>
      <Link to={"/admin/products"} style={linkStyle}>
        <div className="dashboard-btn">Производи</div>
      </Link>
      <Link to={"/admin/products"} style={linkStyle}>
        <div className="dashboard-btn">Категории</div>
      </Link>
      <Link to={"/admin/orders"} style={linkStyle}>
        <div className="dashboard-btn">Нарачки</div>
      </Link>
    </div>
  );
};

export default DashboardMenu;
