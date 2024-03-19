import React from "react";
import {  Card, Col, Container, Row } from "react-bootstrap";


const OrderItem = ({ orderItem }) => {
  const { productName, productPrice, subTotal } = orderItem;
  return (
    <Container style={{ width: "80%" }} className="mt-5">
      <Card className="h-100 position-relative border-0 shadow-none">
        <Row>
          <Col md={4}>
            
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

              
            </Card.Body>
          </Col>
        </Row>
        <hr className="border-bottom my-3" style={{ borderColor: "black" }} />
      </Card>
    </Container>
  );
};

export default OrderItem;
