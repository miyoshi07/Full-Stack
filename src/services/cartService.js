export const addProductToCart = async (payload, token) => {
  try {
    const response = await fetch(
      `${process.env.REACT_APP_BASE_URL}/cart/addToCart`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(payload),
      }
    );
    const data = await response.json();
    console.debug(data);

    return { status: response.status, data };
  } catch (error) {
    console.error("Error in adding product to cart", error);
    return {
      status: 500,
      data: { error: "Something went wrong. Please try again later" },
    };
  }
};

export const clearCart = async (token) => {
  try {
    const response = await fetch(
      `${process.env.REACT_APP_BASE_URL}/cart/clearCart`,
      {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    const data = await response.json();
    console.debug(data);

    return { status: response.status, data };
  } catch (error) {
    console.error("Error in clearing user cart", error);
    return {
      status: 500,
      data: { error: "Something went wrong. Please try again later" },
    };
  }
};

export const getUserCart = async (token) => {
  try {
    const response = await fetch(`${process.env.REACT_APP_BASE_URL}/cart/`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    const data = await response.json();
    console.debug(data);

    return { status: response.status, data };
  } catch (error) {
    console.error("Error in retrieving user cart", error);
    return {
      status: 500,
      data: { error: "Something went wrong. Please try again later" },
    };
  }
};

export const removeItemFromCart = async (productId, token) => {
  try {
    const response = await fetch(
      `${process.env.REACT_APP_BASE_URL}/cart/${productId}/removeFromCart`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );
    const data = await response.json();
    console.debug(data);

    return { status: response.status, data };
  } catch (error) {
    console.error("Error in removing item from cart", error);
    return {
      status: 500,
      data: { error: "Something went wrong. Please try again later" },
    };
  }
};

export const updateQuantity = async (payload, token) => {
  try {
    const response = await fetch(
      `${process.env.REACT_APP_BASE_URL}/cart/updateQuantity`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(payload),
      }
    );
    const data = await response.json();
    console.debug(data);

    return { status: response.status, data };
  } catch (error) {
    console.error("Error in updating cart item quantity", error);
    return {
      status: 500,
      data: { error: "Something went wrong. Please try again later" },
    };
  }
};
