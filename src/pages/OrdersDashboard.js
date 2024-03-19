import React, { useContext, useEffect, useState } from "react";
import UserContext from "../context/UserContext";
import { Navigate } from "react-router-dom";
import { Container } from "react-bootstrap";
import OrderAccordion from "../components/OrderAccordion";
import { getAllOrders } from "../services/orderService";

const OrdersDashboard = () => {
  const { user } = useContext(UserContext);

  const [ordersData, setOrdersData] = useState([]);
  const [orders, setOrders] = useState([]);

  const fetchAllOrders = async () => {
    const token = localStorage.getItem("token");
    const allOrdersResponse = await getAllOrders(token);

    if (allOrdersResponse.status === 200) {
      setOrdersData(allOrdersResponse.data.orders);
    }
  };

  useEffect(() => {
    fetchAllOrders();
  }, []);

  useEffect(() => {
    if (ordersData) {
      const orderList = ordersData.map((order) => {
        return <OrderAccordion key={order._id} order={order} />;
      });

      setOrders(orderList);
    }
  }, [ordersData]);

  return (
    <>
      {user.id === null ? (
        <Navigate to="/" />
      ) : (
        <>
          <Container fluid>
            <h1 className="text-center my-4"> Orders Dashboard</h1>
            {orders}
          </Container>
        </>
      )}
    </>
  );
};

export default OrdersDashboard;
