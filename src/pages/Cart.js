import React, { useContext, useEffect, useState } from "react";
import { Button, Card, Col, Container, Row, Table } from "react-bootstrap";
import { Link, Navigate, useNavigate } from "react-router-dom";
import UserContext from "../context/UserContext";
import { checkoutOrder } from "../services/orderService";
import {
  clearCart,
  getUserCart,
  removeItemFromCart,
  updateQuantity,
} from "../services/cartService";
import Swal from "sweetalert2";
import QuantityControl from "../components/QuantityControl";
import GadgetImage from "../assets/gadget.jpg";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashAlt } from "@fortawesome/free-solid-svg-icons";

const Cart = () => {
  const { user } = useContext(UserContext);
  const navigate = useNavigate();
  const [userCart, setUserCart] = useState();
  const [cartItemRows, setCartItemRows] = useState([]);
  const [totalItems, setTotalItems] = useState(0);

  const checkoutUserCart = async () => {
    const token = localStorage.getItem("token");
    const checkoutOrderResponse = await checkoutOrder(token);

    if (checkoutOrderResponse.status === 201) {
      Swal.fire("Success", checkoutOrderResponse.data.message, "success").then(
        () => {
          navigate("/orders");
        }
      );
    } else {
      Swal.fire("Error", checkoutOrderResponse.data.error, "error");
    }
  };
  const fetchUserCart = async () => {
    const token = localStorage.getItem("token");
    const userCartResponse = await getUserCart(token);

    if (userCartResponse.status === 200) {
      setUserCart(userCartResponse.data.cart);
    } else {
      Swal.fire("Error", userCartResponse.data.error, "error");
    }
  };

  const clearUserCart = async () => {
    const token = localStorage.getItem("token");
    const clearCartResponse = await clearCart(token);

    if (clearCartResponse.status === 200) {
      Swal.fire("Success", clearCartResponse.data.message, "success");
      fetchUserCart();
    } else {
      Swal.fire("Error", clearCartResponse.data.error, "error");
    }
  };

  const updateCartItemQuantity = async (quantity, productId) => {
    if (quantity > 0) {
      const token = localStorage.getItem("token");
      const quantityUpdateDetails = {
        productId,
        quantity,
      };
      const updateQuantityResponse = await updateQuantity(
        quantityUpdateDetails,
        token
      );

      if (updateQuantityResponse.status === 200) {
        Swal.fire(
          "Success",
          updateQuantityResponse.data.message,
          "success"
        ).then(() => {
          fetchUserCart();
        });
      } else {
        Swal.fire("Error", updateQuantityResponse.data.error, "error");
      }
    }
  };

  const removeCartItem = async (productId) => {
    const token = localStorage.getItem("token");
    const removeItemFromCartResponse = await removeItemFromCart(
      productId,
      token
    );

    if (removeItemFromCartResponse.status === 200) {
      Swal.fire("Success", removeItemFromCartResponse.data.message, "success");
      fetchUserCart();
    } else {
      Swal.fire("Error", removeItemFromCartResponse.data.error, "error");
    }
  };

  useEffect(() => {
    fetchUserCart();
  }, []);

  useEffect(() => {
    if (userCart) {
      const cartItems = userCart.cartItems.map((item) => {
        return (
          <Card className="h-100 position-relative border-0 shadow-none">
            <Row>
              <Col md={4}>
                <Card.Img variant="top" src={GadgetImage} />
              </Col>
              <Col md={8}>
                <Card.Body className="d-flex flex-column">
                  <Row>
                    <Col>
                      <Card.Title className="ms-2">
                        {item.productName}
                      </Card.Title>
                    </Col>
                    <Col className="d-flex justify-content-end">
                      <Card.Title>
                        {"Subtotal: "}
                        <span>&#8369;</span>
                        {new Intl.NumberFormat().format(item.subTotal)}
                      </Card.Title>
                    </Col>
                  </Row>
                  <Row>
                    <Col>
                      <Card.Subtitle className="my-2 ms-2 text-secondary">
                        <span>&#8369;</span>
                        {new Intl.NumberFormat().format(item?.productPrice)}
                      </Card.Subtitle>
                    </Col>
                    <Col className="d-flex justify-content-end"></Col>
                  </Row>

                  <Container fluid>
                    <Row className="d-flex flex-column">
                      <Col xs={4} className="py-3">
                        <QuantityControl
                          quantity={item.quantity}
                          setQuantity={(newQuantity) =>
                            updateCartItemQuantity(newQuantity, item.productId)
                          }
                        />
                      </Col>
                    </Row>
                  </Container>
                  <Button
                    className="position-absolute bottom-0 end-0 mb-5 me-3"
                    variant="light"
                    onClick={() => removeCartItem(item.productId)}
                  >
                    <FontAwesomeIcon
                      icon={faTrashAlt}
                      style={{ fontSize: "30px" }}
                    />
                  </Button>
                </Card.Body>
              </Col>
            </Row>
            <hr
              className="border-bottom my-3"
              style={{ borderColor: "black" }}
            />
          </Card>
        );
      });
      if (cartItems.length > 0) {
        setCartItemRows(cartItems);
        setTotalItems(
          userCart.cartItems.reduce((accu, cur) => accu + cur.quantity, 0)
        );
      } else {
        setCartItemRows(
          <Container>
            <h4>Your Cart is Empty.</h4>
            <p>Once you add something to your cart - it will appear here.</p>
            <Link to="/products" className="btn btn-dark">
              {"GET STARTED >>>"}
            </Link>
          </Container>
        );
        setTotalItems(0);
      }
    }
  }, [userCart]);
  return (
    <>
      {user.id === null || user.isAdmin ? (
        <Navigate to="/" />
      ) : (
        <>
          <Container className="border border-3 border-dark rounded my-5 p-4 product-card-img">
            <Row className="mb-3">
              <Col className="d-flex flex-column">
                <h2>Shopping Cart</h2>
                <h4 className="text-secondary">Total Items: {totalItems}</h4>
              </Col>
              <Col className="d-flex flex-column align-items-end">
                <h4 className="me-5">
                  Total <span>&#8369;</span>
                  {new Intl.NumberFormat().format(userCart?.totalPrice || 0)}
                </h4>
                <Button
                  className="p-2"
                  style={{ width: "215px" }}
                  variant="dark"
                  onClick={checkoutUserCart}
                  disabled={!userCart?.totalPrice > 0}
                >
                  Checkout Cart
                </Button>
                <Button
                  className="p-2 mt-1"
                  style={{ width: "215px" }}
                  variant="dark"
                  onClick={clearUserCart}
                  disabled={!userCart?.totalPrice > 0}
                >
                  Clear Cart
                </Button>
              </Col>
              <hr
                className="border-bottom my-3"
                style={{ borderColor: "black" }}
              />
            </Row>
            <Row>{cartItemRows}</Row>
          </Container>
        </>
      )}
    </>
  );
};

export default Cart;
