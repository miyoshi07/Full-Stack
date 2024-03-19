import React, { useEffect, useState } from "react";
import { Button, Card, Container, Form, Row, Col } from "react-bootstrap";
import { useParams } from "react-router-dom";
import {
  getProductById,
  getProductReviews,
  getProductStatistics,
} from "../services/productService";
import AddToCart from "../components/AddToCart";
import GadgetImage from "../assets/gadget.jpg";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar } from "@fortawesome/free-solid-svg-icons";
import ReviewCard from "../components/ReviewCard";

const ProductView = () => {
  const { productId } = useParams();
  const [product, setProduct] = useState({});
  const [productReviews, setProductReviews] = useState([]);
  const [productReviewRows, setProductReviewRows] = useState([]);
  const [productStats, setProductStats] = useState({});

  const fetchProductDetails = async () => {
    const productResponse = await getProductById(productId);

    if (productResponse.status === 200) {
      setProduct(productResponse.data.product);
    }
  };

  const fetchProductReviews = async () => {
    const productReviewsResponse = await getProductReviews(productId);

    if (productReviewsResponse.status === 200) {
      setProductReviews(productReviewsResponse.data.reviews);
    }
  };

  const fetchProductStatistics = async () => {
    const productStatsResponse = await getProductStatistics(productId);

    if (productStatsResponse.status === 200) {
      setProductStats(productStatsResponse.data);
    }
  };

  useEffect(() => {
    fetchProductDetails();
    fetchProductReviews();
    fetchProductStatistics();
  }, []);

  useEffect(() => {
    const productReviewList = productReviews?.map((reviewData) => {
      return <ReviewCard reviewData={reviewData} />;
    });

    if (productReviewList?.length > 0) {
      setProductReviewRows(productReviewList);
    } else {
      setProductReviewRows(
        <Container>
          <Card className="product-card-img p-5 text-center">
            <Card.Title>No reviews yet for this product.</Card.Title>
          </Card>
        </Container>
      );
    }
  }, [productReviews]);

  return (
    <>
      <Container style={{ width: "80%" }} className="mt-5">
        <Card className="m-3 product-card-img h-100 position-relative">
          <Row>
            <Col md={4}>
              <Card.Img variant="top" src={GadgetImage} />
            </Col>
            <Col md={8}>
              <Card.Body className="d-flex flex-column">
                <Row>
                  <Col>
                    <Card.Title className="ms-2">{product.name}</Card.Title>
                  </Col>
                  <Col className="d-flex justify-content-end">
                    <h4 className="me-2">
                      <FontAwesomeIcon
                        className="me-2"
                        style={{ color: "gold" }}
                        icon={faStar}
                      />
                      {productStats?.averageRating?.toFixed(1)}
                    </h4>
                    <h4 className="text-secondary">
                      ({productStats?.totalReviews} Review)
                    </h4>
                  </Col>
                </Row>
                <Row>
                  <Col>
                    <Card.Title className=" ms-2 text-secondary">
                      <span>&#8369;</span>
                      {new Intl.NumberFormat().format(product?.price || 0)}
                    </Card.Title>
                  </Col>
                  <Col className="d-flex justify-content-end">
                    <Card.Title className="me-3 text-secondary">
                      {productStats?.totalOrders || 0} {"Sold"}
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
      <Container>{productReviewRows}</Container>
    </>
  );
};

export default ProductView;
