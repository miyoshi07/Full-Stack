import React, { useEffect, useState } from "react";
import { Accordion } from "react-bootstrap";
import OrderItem from "./OrderItem";
import moment from "moment";

const OrderAccordion = ({ order }) => {
  const [orderItems, setOrderItems] = useState([]);

  useEffect(() => {
    if (order) {
      const orderItemList = order.productsOrdered.map((product) => {
        return <OrderItem key={product._id} orderItem={product} />;
      });
      setOrderItems(orderItemList);
    }
  }, [order]);

  return (
    <Accordion defaultActiveKey="0">
      <Accordion.Item eventKey="1">
        <Accordion.Header>
          Order No: {order?._id} - {order?.orderedBy} -{" "}
          {moment(order?.orderedOn).format("MMM D, YYYY h:mm:s A")}
          {order?.status}
        </Accordion.Header>
        <Accordion.Body>{orderItems}</Accordion.Body>
      </Accordion.Item>
    </Accordion>
  );
};

export default OrderAccordion;
