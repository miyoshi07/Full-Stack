import React, { useEffect, useState } from "react";
import { Card, Col, Row } from "react-bootstrap";
import { Link } from "react-router-dom";
import OrderItem from "./OrderItem";
import moment from "moment";

const OrderCard = ({ order }) => {
  const [orderItems, setOrderItems] = useState([]);

  const statusClass = (status) => {
    if (status === "Pending") {
      return "text-warning";
    } else if (status === "Cancelled") {
      return "text-danger";
    } else {
      return "text-success";
    }
  };

  useEffect(() => {
    if (order) {
      const orderItemList = order.productsOrdered.map((product) => {
        return <OrderItem key={product._id} orderItem={product} />;
      });
      setOrderItems(orderItemList);
    }
  }, [order]);
  return (
    <Card className="mb-2">
      <Card.Body>
        <Row>
          <Col className="ms-3">
            <Card.Title>Order ID: {order._id}</Card.Title>
          </Col>
          <Col className="me-3 d-flex justify-content-end">
            <Card.Title>
              Total: <span>&#8369;</span>
              {new Intl.NumberFormat().format(order?.totalPrice || 0)}
            </Card.Title>
          </Col>
        </Row>
        <Row>
          <Col className="ms-3 text-secondary">
            <Card.Subtitle className="font-italic">
              {moment(order.orderedOn).format("MMM D, YYYY h:mm:s A")}
            </Card.Subtitle>
          </Col>
          <Col
            className={`${statusClass(
              order?.status
            )} me-3 d-flex justify-content-end`}
          >
            <Card.Title>{order.status.toUpperCase()}</Card.Title>
          </Col>
        </Row>

        {orderItems}
      </Card.Body>
    </Card>
  );
};

export default OrderCard;
