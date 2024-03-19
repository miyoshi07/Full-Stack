import React, { useEffect, useState } from "react";
import { Button, Container, Form, Modal } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar } from "@fortawesome/free-solid-svg-icons";
import { addProductReview } from "../services/productService";
import Swal from "sweetalert2";

const AddReview = ({ productId, productName }) => {
  const [review, setReview] = useState("");
  const [rating, setRating] = useState(1);
  const [isAnonymous, setIsAnonymous] = useState(false);
  const [show, setShow] = useState(false);
  const [isActive, setIsActive] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const submitReview = async () => {
    const token = localStorage.getItem("token");
    const productReview = {
      review,
      rating,
      isAnonymous: Boolean(isAnonymous),
    };

    const addReviewResponse = await addProductReview(
      productId,
      productReview,
      token
    );

    if (addReviewResponse.status === 201) {
      Swal.fire("Success", addReviewResponse.data.message, "success").then(
        () => {
          setShow(false);
          setReview("");
          setRating(1);
        }
      );
    } else {
      Swal.fire("Error", addProductReview.data.error, "error");
    }
  };

  useEffect(() => {
    if (review.trim() !== "") {
      setIsActive(true);
    } else {
      setIsActive(false);
    }
  }, [review]);

  return (
    <>
      <Button
        className="position-absolute bottom-0 end-0 mb-5 me-3"
        variant="dark"
        onClick={handleShow}
      >
        Write Review
      </Button>
      <Modal show={show} onHide={handleClose} animation={false}>
        <Modal.Header closeButton>
          <Modal.Title>{productName}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Control
              as="textarea"
              placeholder="Write your review here..."
              value={review}
              onChange={(e) => setReview(e.target.value)}
              rows={5}
              style={{ resize: "none" }}
            />
            <Form.Group className="mt-2">
              <Form.Check
                inline
                type="checkbox"
                label="Submit Review as Anonymous"
                value={isAnonymous}
                onChange={(e) => setIsAnonymous(e.target.value)}
              />
            </Form.Group>

            <Container className="mt-3 d-flex justify-content-center">
              {[...Array(5)].map((item, index) => {
                const givenRating = index + 1;
                return (
                  <Form.Label>
                    <Form.Control
                      type="radio"
                      value={givenRating}
                      onClick={() => {
                        setRating(givenRating);
                      }}
                      style={{ display: "none" }}
                    />
                    <FontAwesomeIcon
                      icon={faStar}
                      color={
                        givenRating < rating || givenRating === rating
                          ? "gold"
                          : "rgb(192,192,192)"
                      }
                      style={{ fontSize: "25px" }}
                    />
                  </Form.Label>
                );
              })}
            </Container>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="dark" onClick={submitReview} disabled={!isActive}>
            Submit Review
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default AddReview;
