import React from "react";
import { Button } from "react-bootstrap";
import { activateProduct, archiveProduct } from "../services/productService";
import Swal from "sweetalert2";

const ToggleProductStatus = ({ productData, fetchAllProducts }) => {
  const disableProduct = async () => {
    const token = localStorage.getItem("token");
    const archiveProductResponse = await archiveProduct(productData._id, token);

    if (archiveProductResponse.status === 200) {
      Swal.fire("Success", archiveProductResponse.data.message, "success");
      fetchAllProducts();
    } else {
      Swal.fire("Error", archiveProductResponse.data.error, "error");
    }
  };

  const enableProduct = async () => {
    const token = localStorage.getItem("token");
    const activateProductResponse = await activateProduct(
      productData._id,
      token
    );

    if (activateProductResponse.status === 200) {
      Swal.fire("Success", activateProductResponse.data.message, "success");
      fetchAllProducts();
    } else {
      Swal.fire("Error", activateProductResponse.data.error, "error");
    }
  };

  return (
    <>
      {productData.isActive ? (
        <Button variant="danger" onClick={disableProduct}>
          Disable
        </Button>
      ) : (
        <Button variant="success" onClick={enableProduct}>
          Enable
        </Button>
      )}
    </>
  );
};

export default ToggleProductStatus;
