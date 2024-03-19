import React from "react";
import { Card, Col } from "react-bootstrap";
import { Link } from "react-router-dom";
import GadgetImage from "../assets/gadget.jpg";

const ProductCard = ({ product }) => {
  const { _id, name, description, price } = product;

  return (
    <Col xs={12} sm={6} md={4} lg={3} className="mb-3">
      <Card className="m-3 product-card-img h-100 position-relative">
        <Card.Img variant="top" src={GadgetImage} />
        <Card.Body className="d-flex flex-column mt-auto">
          <Card.Title>{name}</Card.Title>
          <Card.Subtitle className="my-2 text-secondary">
            <span>&#8369;</span>
            {new Intl.NumberFormat().format(price)}
          </Card.Subtitle>
          <Card.Text>{description}</Card.Text>

          <Link className="btn btn-dark mt-auto" to={`/products/${_id}`}>
            Details
          </Link>
        </Card.Body>
      </Card>
    </Col>
  );
};

export default ProductCard;
