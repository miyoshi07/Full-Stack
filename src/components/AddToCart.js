import React, { useContext } from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button, Container, Form, Row, Col, InputGroup } from "react-bootstrap";
import Swal from "sweetalert2";
import UserContext from "../context/UserContext";
import { addProductToCart } from "../services/cartService";
import QuantityControl from "./QuantityControl";

const AddToCart = ({ productId }) => {
  const { user } = useContext(UserContext);
  const navigate = useNavigate();

  const [quantity, setQuantity] = useState(1);

  const AddProductToCart = async () => {
    if (user.id === null) {
      Swal.fire(
        "Warning",
        "User needs to login before adding to cart.",
        "warning"
      ).then(() => {
        navigate("/login");
      });
    } else {
      const token = localStorage.getItem("token");
      const cartItem = {
        productId,
        quantity,
      };
      const addToCartResponse = await addProductToCart(cartItem, token);

      if (addToCartResponse.status === 201) {
        Swal.fire("Success", addToCartResponse.data.message, "success").then(
          () => {
            setQuantity(1);
            navigate("/cart");
          }
        );
      } else {
        Swal.fire("Error", addToCartResponse.data.error, "error");
      }
    }
  };
  return (
    <>
      <Container fluid>
        <Row className="d-flex flex-column">
          <Col xs={6} md={10} lg={5} xl={5} xxl={3} className="py-3">
            <QuantityControl quantity={quantity} setQuantity={setQuantity} />
          </Col>
          <Col>
            <Button
              style={{ width: "300px" }}
              variant="dark"
              onClick={AddProductToCart}
            >
              Add to Cart
            </Button>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default AddToCart;
