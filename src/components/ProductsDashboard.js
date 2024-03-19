import React, { useContext } from "react";
import { useEffect, useState } from "react";
import {  Container, Table } from "react-bootstrap";
import { Navigate } from "react-router-dom";
import { getAllProducts } from "../services/productService";
import AddProduct from "./AddProduct";
import EditProduct from "./EditProduct";
import ToggleProductStatus from "./ToggleProductStatus";
import UserContext from "../context/UserContext";

const ProductsDashboard = () => {
  const { user } = useContext(UserContext);

  const [productsData, setProductsData] = useState([]);
  const [products, setProducts] = useState([]);

  const fetchAllProducts = async () => {
    const productsResponse = await getAllProducts();

    if (productsResponse.status === 200) {
      setProductsData(productsResponse.data.products);
    }
  };

  useEffect(() => {
    fetchAllProducts();
  }, []);

  useEffect(() => {
    const productList = productsData.map((productData) => {
      return (
        <tr key={productData._id}>
          <td>{productData.name}</td>
          <td>{productData.description}</td>
          <td>{productData.price}</td>
          <td className={productData.isActive ? "text-success" : "text-danger"}>
            {productData.isActive ? "Available" : "Unavailable"}
          </td>
          <td>
            <EditProduct
              productData={productData}
              fetchAllProducts={fetchAllProducts}
            />
          </td>
          <td>
            <ToggleProductStatus
              productData={productData}
              fetchAllProducts={fetchAllProducts}
            />
          </td>
        </tr>
      );
    });

    setProducts(productList);
  }, [productsData]);
  return (
    <>
      {user.id === null ? (
        <Navigate to="/" />
      ) : (
        <>
          <Container fluid>
            <h1 className="text-center my-4"> Products Dashboard</h1>
            <AddProduct fetchAllProducts={fetchAllProducts} />

            <Table striped bordered hover responsive>
              <thead>
                <tr className="text-center">
                  <th>Name</th>
                  <th>Description</th>
                  <th>Price</th>
                  <th>Availability</th>
                  <th colSpan="2">Actions</th>
                </tr>
              </thead>
              <tbody>{products}</tbody>
            </Table>
          </Container>
        </>
      )}
    </>
  );
};

export default ProductsDashboard;
