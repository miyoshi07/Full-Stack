import React from "react";
import { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Form, Button, Container, Row, Col } from "react-bootstrap";
import { Navigate } from "react-router-dom";
import { registerUser } from "../services/userService";
import UserContext from "../context/UserContext";
import Swal from "sweetalert2";

const Register = () => {
  const navigate = useNavigate();

  const { user } = useContext(UserContext);

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [mobileNo, setMobileNo] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isActive, setIsActive] = useState(false);

  const submitRegistration = async (e) => {
    e.preventDefault();

    const userDetails = {
      firstName,
      lastName,
      email,
      mobileNo,
      password,
    };

    const response = await registerUser(userDetails);

    if (response.status !== 201) {
      Swal.fire("Error", response.data.error, "error");
    } else {
      Swal.fire("Success", response.data.message, "success").then(() => {
        navigate("/login");
      });
    }
  };

  useEffect(() => {
    if (
      firstName.trim() !== "" &&
      lastName.trim() !== "" &&
      email.trim() !== "" &&
      mobileNo.trim() !== "" &&
      password.trim() !== "" &&
      confirmPassword.trim() !== "" &&
      password === confirmPassword &&
      mobileNo.length === 11
    ) {
      setIsActive(true);
    } else {
      setIsActive(false);
    }
  }, [firstName, lastName, email, mobileNo, password, confirmPassword]);

  return (
    <>
      {user.id !== null ? (
        <Navigate to="/" />
      ) : (
        <Container
          className="p-5 d-flex flex-column product-card-img p-2"
          style={{ width: "35%", marginTop: "50px" }}
        >
          <Form onSubmit={(e) => submitRegistration(e)}>
            <h1 className="mb-3 text-center">Register</h1>
            <Form.Group>
              <Form.Label>First Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter your First Name"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                required
              />
            </Form.Group>

            <Form.Group className="mt-2">
              <Form.Label>Last Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter your Last Name"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                required
              />
            </Form.Group>

            <Form.Group className="mt-2">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </Form.Group>

            <Form.Group className="mt-2">
              <Form.Label>Mobile Number</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter your mobile number"
                value={mobileNo}
                onChange={(e) => setMobileNo(e.target.value)}
                required
              />
            </Form.Group>

            <Form.Group className="mt-2">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </Form.Group>

            <Form.Group className="mt-2">
              <Form.Label>Confirm Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Verify your password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
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
                  style={{ width: "200px" }}
                  disabled={!isActive}
                >
                  Register
                </Button>
              </Col>
              <hr />
              <Col className="mt-2 d-flex justify-content-center">
                <Link
                  to="/login"
                  className="btn btn-dark"
                  style={{ width: "200px" }}
                >
                  Click here to Login
                </Link>
              </Col>
            </Row>
          </Form>
        </Container>
      )}
    </>
  );
};

export default Register;
