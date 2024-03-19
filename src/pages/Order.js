import React, { useContext, useEffect, useState } from "react";
import { getUserOrders } from "../services/orderService";
import OrderCard from "../components/OrderCard";
import { Col, Container, Row } from "react-bootstrap";
import { Link, Navigate } from "react-router-dom";
import UserContext from "../context/UserContext";

const Order = () => {
  const { user } = useContext(UserContext);

  const [ordersData, setOrdersData] = useState([]);
  const [orders, setOrders] = useState([]);

  const fetchUserOders = async () => {
    const token = localStorage.getItem("token");
    const userOrdersResponse = await getUserOrders(token);

    if (userOrdersResponse.status === 200) {
      setOrdersData(userOrdersResponse.data.orders);
    }
  };

  useEffect(() => {
    fetchUserOders();
  }, []);

  useEffect(() => {
    if (ordersData) {
      const orderList = ordersData.map((order) => {
        return <OrderCard key={order._id} order={order} />;
      });

      if (orderList.length > 0) {
        setOrders(orderList);
      } else {
        setOrders(
          <Container>
            <h4>You have not checkout any orders yet</h4>
            <p>
              Once you checkout something from your cart - it will appear here.
            </p>
            <Link to="/products" className="btn btn-dark">
              {"GET STARTED >>>"}
            </Link>
          </Container>
        );
      }
    }
  }, [ordersData]);
  return (
    <>
      {user.id === null || user.isAdmin ? (
        <Navigate to="/" />
      ) : (
        <Container className="border border-3 border-dark rounded my-5 p-4 product-card-img">
          <Row className="mb-3">
            <Col className="d-flex flex-column">
              <h2>
                My Orders
                <span className="text-secondary">
                  ({ordersData?.length || 0})
                </span>
              </h2>
            </Col>
            <hr
              className="border-bottom my-3"
              style={{ borderColor: "black" }}
            />
          </Row>
          {orders}
        </Container>
      )}
    </>
  );
};

export default Order;
