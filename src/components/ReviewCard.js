import React from "react";
import { Card, Container } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar } from "@fortawesome/free-solid-svg-icons";
import moment from "moment";

const ReviewCard = ({ reviewData }) => {
  return (
    <Container className="mb-2">
      <Card className="product-card-img p-2">
        <Card.Body>
          <Card.Title>
            {reviewData.customerName}
            <span className="ms-2">
              <FontAwesomeIcon
                className="me-1"
                style={{ color: "gold" }}
                icon={faStar}
              />
              {reviewData.rating}
            </span>
          </Card.Title>
          <Card.Text>{reviewData.review}</Card.Text>
          <hr />
          <Card.Text>
            {moment(reviewData.date).format("MMMM D, YYYY h:mm:s A")}
          </Card.Text>
        </Card.Body>
      </Card>
    </Container>
  );
};

export default ReviewCard;
