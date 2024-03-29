import { BrowserRouter, Route, Routes } from "react-router-dom";
import Header from "./Components/Header/Header";
import "bootstrap/dist/css/bootstrap.min.css";
import Home from "./Pages/HomePage/Home";
import Footer from "./Components/Footer/Footer";
import Login from "./Pages/LoginPage/Login";
import Signup from "./Pages/SignupPage/Signup";
import AddCategory from "./Pages/AddCategoryPage/AddCategory";
import AddProduct from "./Pages/AddProductPage/AddProduct";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ListProducts from "./Pages/ListProductsPage/ListProducts";
import EditProduct from "./Pages/EditProductPage/EditProduct";
import CategoryList from "./Pages/CategoryListPage/CategoryList";
import ProductDetails from "./Pages/ProductDetailsPage/ProductDetails";
import CartPage from "./Pages/CartPage/CartPage";
import AddressPage from "./Pages/AddressPage/AddressPage";
import PlaceOrder from "./Pages/PlaceOrderPage/PlaceOrder";
import OrderList from "./Pages/OrderListPage/OrderList";
import OrderHistory from "./Pages/OrderHistoryPage/OrderHistory";
import Profile from "./Pages/ProfilePage/Profile";
import ProductsByCategory from "./Pages/ProductByCategoryPage/ProductsByCategory";

function App() {
  return (
    <BrowserRouter>
      <div style={{ position: "relative", minHeight: "100vh" }}>
        <ToastContainer position="bottom-center" limit={1} />
        <Header />
        <main style={{ marginBottom: "20px" }}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/admin/addCategory" element={<AddCategory />} />
            <Route path="/admin/addProduct" element={<AddProduct />} />
            <Route path="/admin/products" element={<ListProducts />} />
            <Route path="/admin/products/:slug" element={<EditProduct />} />
            <Route path="/admin/categories" element={<CategoryList />} />
            <Route path="/admin/orders" element={<OrderList />} />
            <Route path="/admin/order/:id" element={<PlaceOrder />} />
            <Route path="/products/:slug" element={<ProductDetails />} />
            <Route path="/cart" element={<CartPage />} />
            <Route path="/shipping" element={<AddressPage />} />
            <Route path="/placeOrder" element={<PlaceOrder />} />
            <Route path="/order/:id" element={<PlaceOrder />} />
            <Route path="/orderhistory" element={<OrderHistory />} />
            <Route path="/profile" element={<Profile />} />
            <Route
              path="/products/:category/:subCategory"
              element={<ProductsByCategory />}
            />
          </Routes>
        </main>
        <Footer />
      </div>
    </BrowserRouter>
  );
}

export default App;
