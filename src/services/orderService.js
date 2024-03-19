export const checkoutOrder = async (token) => {
  try {
    const response = await fetch(
      `${process.env.REACT_APP_BASE_URL}/orders/checkout`,
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    const data = await response.json();
    console.debug(data);

    return { status: response.status, data };
  } catch (error) {
    console.error("Error in checking out user order", error);
    return {
      status: 500,
      data: { error: "Something went wrong. Please try again later" },
    };
  }
};

export const getAllOrders = async (token) => {
  try {
    const response = await fetch(
      `${process.env.REACT_APP_BASE_URL}/orders/all-orders`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    const data = await response.json();
    console.debug(data);

    return { status: response.status, data };
  } catch (error) {
    console.error("Error in retrieving all orders", error);
    return {
      status: 500,
      data: { error: "Something went wrong. Please try again later" },
    };
  }
};

export const getUserOrders = async (token) => {
  try {
    const response = await fetch(
      `${process.env.REACT_APP_BASE_URL}/orders/my-orders`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    const data = await response.json();
    console.debug(data);

    return { status: response.status, data };
  } catch (error) {
    console.error("Error in retrieving user orders", error);
    return {
      status: 500,
      data: { error: "Something went wrong. Please try again later" },
    };
  }
};
