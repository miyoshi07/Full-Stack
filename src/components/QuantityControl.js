import React, { useState } from "react";
import { Button, Container, Row, Col, InputGroup, Form } from "react-bootstrap";

const QuantityControl = ({ setQuantity, quantity }) => {
  const [newQuantity, setNewQuantity] = useState(quantity);

  const submitQuantity = () => {
    setQuantity(newQuantity);
  };
  return (
    <InputGroup>
      <Button
        className="quantity-control-button"
        variant="dark"
        onClick={(e) => {
          setQuantity(newQuantity - 1);
          setNewQuantity(newQuantity - 1);
        }}
        disabled={quantity < 2}
      >
        -
      </Button>{" "}
      <Form.Control
        className="quantity-control-input"
        type="number"
        required
        value={newQuantity}
        onChange={(e) => setNewQuantity(+e.target.value)}
        onBlur={submitQuantity}
      />
      <Button
        className="quantity-control-button"
        variant="dark"
        onClick={(e) => {
          setQuantity(newQuantity + 1);
          setNewQuantity(newQuantity + 1);
        }}
      >
        +
      </Button>
    </InputGroup>
  );
};

export default QuantityControl;
