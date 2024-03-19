import React, { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import { getActiveProducts } from "../services/productService";
import ProductCard from "./ProductCard";
import { Container, Row } from "react-bootstrap";

const Products = () => {
  const [productsData, setProductsData] = useState([]);
  const [products, setProducts] = useState([]);

  const fetchActiveProducts = async () => {
    const activeProductsResponse = await getActiveProducts();

    if (activeProductsResponse.status === 200) {
      setProductsData(activeProductsResponse.data.activeProducts);
    }
  };

  useEffect(() => {
    fetchActiveProducts();
  }, []);

  useEffect(() => {
    const activeProducts = productsData.map((productData) => {
      return <ProductCard key={productData._id} product={productData} />;
    });

    setProducts(activeProducts);
  }, [productsData]);

  return (
    <>
      <h1 className="text-center my-4">Products</h1>
      <Container>
        <Row>{products}</Row>
      </Container>
    </>
  );
};

export default Products;
