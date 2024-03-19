import React from "react";
import { useEffect, useState } from "react";
import { Button, Form, Modal } from "react-bootstrap";
import { createProduct } from "../services/productService";
import Swal from "sweetalert2";

const AddProduct = ({ fetchAllProducts }) => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState(0);
  const [isActive, setIsActive] = useState(false);
  const [showModal, setShowModal] = useState(false);

  const addProduct = async (e) => {
    e.preventDefault();

    const productDetails = {
      name,
      description,
      price,
    };

    const token = localStorage.getItem("token");
    const addProductResponse = await createProduct(productDetails, token);

    if (addProductResponse.status === 201) {
      Swal.fire("Success", addProductResponse.data.message, "success").then(
        () => {
          fetchAllProducts();
          closeModal();
        }
      );
    } else {
      Swal.fire("Error", addProductResponse.data.error, "error");
    }
  };

  const closeModal = () => {
    setShowModal(false);
    setName("");
    setDescription("");
    setPrice(0);
  };

  useEffect(() => {
    if (name.trim() !== "" && description.trim() !== "" && price > 0) {
      setIsActive(true);
    } else {
      setIsActive(false);
    }
  }, [name, description, price]);

  return (
    <>
      <Button variant="primary" onClick={() => setShowModal(true)}>
        Add New Product
      </Button>
      <Modal show={showModal} onHide={closeModal}>
        <Form onSubmit={(e) => addProduct(e)}>
          <Modal.Header closeButton>
            <Modal.Title>Add Product</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form.Group>
              <Form.Label>Product Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter Product Name"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </Form.Group>

            <Form.Group>
              <Form.Label>Product Description</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter Product Description"
                required
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
            </Form.Group>

            <Form.Group>
              <Form.Label>Product Price</Form.Label>
              <Form.Control
                type="number"
                placeholder="Enter Product Price"
                required
                value={price}
                onChange={(e) => setPrice(+e.target.value)}
              />
            </Form.Group>
          </Modal.Body>

          <Modal.Footer>
            <Button variant="secondary" onClick={closeModal}>
              Close
            </Button>
            <Button variant="success" disabled={!isActive} type="submit">
              Add
            </Button>
          </Modal.Footer>
        </Form>
      </Modal>
    </>
  );
};

export default AddProduct;
