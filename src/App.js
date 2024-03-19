import { useState } from "react";
import { Container } from "react-bootstrap";
import { BrowserRouter as Router } from "react-router-dom";
import { Route, Routes } from "react-router-dom";

import AppNavbar from "./components/AppNavBar";
import Cart from "./pages/Cart";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Logout from "./pages/Logout";
import ProductView from "./pages/ProductView";
import Register from "./pages/Register";
import "./App.css";

import { UserProvider } from "./context/UserContext";
import Order from "./pages/Order";
import OrdersDashboard from "./pages/OrdersDashboard";
import UsersDashboard from "./pages/UsersDashboard";

function App() {
  const [user, setUser] = useState({ id: null, isAdmin: null });

  const unsetUser = () => {
    localStorage.clear();
  };

  return (
    <UserProvider value={{ user, setUser, unsetUser }}>
      <Router>
        <AppNavbar />

        <Container fluid>
          <Routes>
            <Route path="/register" element={<Register />} />
            <Route path="/login" element={<Login />} />
            <Route path="/logout" element={<Logout />} />
            <Route path="/" element={<Home />} />
            <Route path="/products" element={<Home />} />
            <Route path="/products/:productId" element={<ProductView />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/orders" element={<Order />} />
            <Route path="/admin/orders" element={<OrdersDashboard />} />
            <Route path="/users" element={<UsersDashboard />} />
          </Routes>
        </Container>
      </Router>
    </UserProvider>
  );
}

export default App;
