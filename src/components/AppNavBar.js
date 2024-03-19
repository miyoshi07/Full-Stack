import React from "react";
import { useContext, useState } from "react";
import Container from "react-bootstrap/Container";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import { Link, NavLink } from "react-router-dom";
import UserContext from "../context/UserContext";
import AppIcon from "../assets/app-icon.png";

export default function AppNavbar() {
  const { user } = useContext(UserContext);

  // State to store the user information stored in the login page.
  // const [user, setUser] = useState(localStorage.getItem("token"));
  console.log(user);

  return (
    <Navbar className="sticky-top" bg="light" expand="lg">
      <Container fluid>
        <Navbar.Brand as={NavLink} to="/">
          <img
            src={AppIcon}
            width="230"
            height="40"
            className="d-inline-block align-top"
            alt="Gadget Loft logo"
          />
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto">
            <Nav.Link as={NavLink} to="/products">
              Products
            </Nav.Link>
            {user.id !== null ? (
              <>
                {!user.isAdmin && (
                  <>
                    <Nav.Link as={NavLink} to="/cart">
                      Cart
                    </Nav.Link>
                    <Nav.Link as={NavLink} to="/orders">
                      Orders
                    </Nav.Link>
                  </>
                )}
                {user.isAdmin && (
                  <>
                    <Nav.Link as={NavLink} to="/users">
                      Users
                    </Nav.Link>
                    <Nav.Link as={NavLink} to="/admin/orders">
                      Orders
                    </Nav.Link>
                  </>
                )}
                <Nav.Link as={NavLink} to="/logout">
                  Logout
                </Nav.Link>
              </>
            ) : (
              <>
                <Nav.Link as={NavLink} to="/login">
                  Login
                </Nav.Link>
                <Nav.Link as={NavLink} to="/register">
                  Register
                </Nav.Link>
              </>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}
