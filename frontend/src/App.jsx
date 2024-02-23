import { BrowserRouter, Route, Routes } from "react-router-dom";
import Header from "./Components/Header/Header";
import "bootstrap/dist/css/bootstrap.min.css";
import Home from "./Pages/HomePage/Home";
import Footer from "./Components/Footer/Footer";
import Login from "./Pages/LoginPage/Login";
import Signup from "./Pages/SignupPage/Signup";
import AddCategory from "./Pages/AddCategoryPage/AddCategory";

function App() {
  return (
    <BrowserRouter>
      <div style={{ position: "relative", minHeight: "100vh" }}>
        <Header />
        <main>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/admin/addCategory" element={<AddCategory />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </BrowserRouter>
  );
}

export default App;
