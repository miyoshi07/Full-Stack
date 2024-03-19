import React from "react";
import { Button, Card, Col, Container, Row } from "react-bootstrap";
import GadgetImage from "../assets/gadget.jpg";
import AddReview from "./AddReview";

const OrderItem = ({ orderItem }) => {
  const { productName, productPrice, quantity, subTotal } = orderItem;
  return (
    <Container style={{ width: "80%" }} className="mt-5">
      <Card className="h-100 position-relative border-0 shadow-none">
        <Row>
          <Col md={4}>
            <Card.Img variant="top" src={GadgetImage} />
          </Col>
          <Col md={8}>
            <Card.Body className="d-flex flex-column">
              <Row>
                <Col>
                  <Card.Title className="ms-2">{productName}</Card.Title>
                </Col>
                <Col className="d-flex justify-content-end">
                  <Card.Title>
                    {"Subtotal: "}
                    <span>&#8369;</span>
                    {new Intl.NumberFormat().format(subTotal)}
                  </Card.Title>
                </Col>
              </Row>
              <Row>
                <Col>
                  <Card.Title className="my-2 ms-2 text-secondary">
                    <span>&#8369;</span>
                    {new Intl.NumberFormat().format(productPrice)}
                  </Card.Title>
                </Col>
              </Row>

              <Card.Subtitle className="ms-2">Qty: {quantity}</Card.Subtitle>
              <AddReview
                productId={orderItem.productId}
                productName={productName}
              />
            </Card.Body>
          </Col>
        </Row>
        <hr className="border-bottom my-3" style={{ borderColor: "black" }} />
      </Card>
    </Container>
  );
};

export default OrderItem;
