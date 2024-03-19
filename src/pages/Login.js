import React from "react";
import { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Form, Button, Container, Row, Col } from "react-bootstrap";
import { Navigate } from "react-router-dom";
import { getUserDetails, loginUser } from "../services/userService";
import Swal from "sweetalert2";

import UserContext from "../context/UserContext";

const Login = () => {
  const navigate = useNavigate();

  const { user, setUser } = useContext(UserContext);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isActive, setIsActive] = useState(true);

  const authenticateUser = async (e) => {
    e.preventDefault();

    const loginCredentials = {
      email,
      password,
    };

    const response = await loginUser(loginCredentials);

    if (response.status !== 200) {
      Swal.fire("Error", response.data.error, "error");
    } else {
      localStorage.setItem("token", response.data.access);
      const userDetailsReponse = await getUserDetails(response.data.access);
      console.log(userDetailsReponse);

      if (userDetailsReponse.status !== 200) {
        Swal.fire("Error", response.data.error, "error");
      } else {
        setUser({
          id: userDetailsReponse.data.user._id,
          isAdmin: userDetailsReponse.data.user.isAdmin,
        });
        Swal.fire("Success", "Login Succesful", "success").then(() => {
          navigate("/");
        });
      }
    }
  };

  useEffect(() => {
    if (email.trim() !== "" && password.trim() !== "") {
      setIsActive(true);
    } else {
      setIsActive(false);
    }
  }, [email, password]);

  return (
    <>
      {user.id !== null ? (
        <Navigate to="/products" />
      ) : (
        <Container
          className="p-5 d-flex flex-column product-card-img p-2"
          style={{ width: "30%", marginTop: "175px" }}
        >
          <Form onSubmit={(e) => authenticateUser(e)}>
            <h1 className="text-center">Login</h1>
            <Form.Group>
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </Form.Group>

            <Form.Group className="mt-3">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </Form.Group>

            <Row className="d-flex flex-column">
              <Col className="d-flex justify-content-center mb-4">
                <Button
                  variant="dark"
                  type="submit"
                  id="submitBtn"
                  className="mt-4"
                  style={{ width: "180px" }}
                  disabled={!isActive}
                >
                  Login
                </Button>
              </Col>
              <hr />
              <Col className="mt-2 d-flex justify-content-center">
                <Link
                  to="/register"
                  className="btn btn-dark"
                  style={{ width: "180px" }}
                >
                  Click here to Register
                </Link>
              </Col>
            </Row>
          </Form>
        </Container>
      )}
    </>
  );
};

export default Login;
