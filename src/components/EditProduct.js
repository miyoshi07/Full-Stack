import React from "react";
import { useEffect, useState } from "react";
import { Button, Form, Modal } from "react-bootstrap";
import { getProductById, updateProduct } from "../services/productService";
import Swal from "sweetalert2";

const EditProduct = ({ productData, fetchAllProducts }) => {
  const [name, setName] = useState(productData.name);
  const [description, setDescription] = useState(productData.description);
  const [price, setPrice] = useState(productData.price);
  const [isActive, setIsActive] = useState(false);
  const [showModal, setShowModal] = useState(false);

  const updateProductDetails = async (e) => {
    e.preventDefault();

    const updatedProductDetails = {
      name,
      description,
      price,
    };

    const token = localStorage.getItem("token");
    const updateProductResponse = await updateProduct(
      productData._id,
      updatedProductDetails,
      token
    );

    if (updateProductResponse.status === 200) {
      Swal.fire("Success", updateProductResponse.data.message, "success").then(
        () => {
          fetchAllProducts();
          closeModal();
        }
      );
    } else {
      Swal.fire("Error", updateProductResponse.data.error, "error");
    }
  };

  const openEditModal = async () => {
    const getProductByIdResponse = await getProductById(productData._id);

    if (getProductByIdResponse.status === 200) {
      setName(getProductByIdResponse.data.product.name);
      setDescription(getProductByIdResponse.data.product.description);
      setPrice(getProductByIdResponse.data.product.price);
      setShowModal(true);
    } else {
      Swal.fire("Error", getProductByIdResponse.data.error, "error");
    }
  };

  const closeModal = () => {
    setShowModal(false);
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
      <Button variant="primary" onClick={openEditModal}>
        Edit
      </Button>
      <Modal show={showModal} onHide={closeModal}>
        <Form onSubmit={(e) => updateProductDetails(e)}>
          <Modal.Header closeButton>
            <Modal.Title>Update Product</Modal.Title>
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
              Update
            </Button>
          </Modal.Footer>
        </Form>
      </Modal>
    </>
  );
};

export default EditProduct;
