import { BrowserRouter, Route, Routes } from "react-router-dom";
import Header from "./Components/Header/Header";
import "bootstrap/dist/css/bootstrap.min.css";
import Home from "./Pages/HomePage/Home";
import Footer from "./Components/Footer/Footer";
import Login from "./Pages/LoginPage/Login";
import Signup from "./Pages/SignupPage/Signup";

function App() {
  return (
    <BrowserRouter>
      <div style={{ position: "relative", minHeight: "100vh" }}>
        <Header />
        <main>
          <Routes>
            <Route path="/" element={<Home />}></Route>
            <Route path="/login" element={<Login />}></Route>
            <Route path="/signup" element={<Signup />}></Route>
          </Routes>
        </main>

        <Footer />
      </div>
    </BrowserRouter>
  );
}

export default App;
