import React, { useEffect, useState, useCallback } from "react";
import { Card, Container, Row, Col } from "react-bootstrap";
import { useParams } from "react-router-dom";
import {
  getProductById
} from "../services/productService";
import AddToCart from "../components/AddToCart";

const ProductView = () => {
  const { productId } = useParams();
  const [product, setProduct] = useState({});

  const fetchProductDetails = useCallback(async () => {
    const productResponse = await getProductById(productId);

    if (productResponse.status === 200) {
      setProduct(productResponse.data.product);
    }
  }, [productId]);

  useEffect(() => {
    fetchProductDetails();
  }, [fetchProductDetails]);



  return (
    <>
      <Container style={{ width: "80%" }} className="mt-5">
        <Card className="m-3 product-card-img h-100 position-relative">
          <Row>
            <Col md={4}>
            
            </Col>
            <Col md={8}>
              <Card.Body className="d-flex flex-column">
                <Row>
                  <Col>
                    <Card.Title className="ms-2">{product.name}</Card.Title>
                 
                  
                   
                  </Col>
                </Row>
                <Row>
                  <Col>
                    <Card.Title className=" ms-2 text-secondary">
                      <span>&#8369;</span>
                      {new Intl.NumberFormat().format(product?.price || 0)}
                    </Card.Title>
                  </Col>
                </Row>

                <Card.Text className="ms-2">{product.description}</Card.Text>
                <AddToCart productId={productId} />
              </Card.Body>
            </Col>
          </Row>
        </Card>
      </Container>

    </>
  );
};

export default ProductView;
