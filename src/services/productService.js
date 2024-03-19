export const activateProduct = async (productId, token) => {
  try {
    const response = await fetch(
      `${process.env.REACT_APP_BASE_URL}/products/activate/${productId}`,
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
    console.error("Error in activating product", error);
    return {
      status: 500,
      data: { error: "Something went wrong. Please try again later" },
    };
  }
};

export const addProductReview = async (productId, payload, token) => {
  try {
    const response = await fetch(
      `${process.env.REACT_APP_BASE_URL}/reviews/${productId}/addProductReview`,
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
    console.error("Error in adding product review", error);
    return {
      status: 500,
      data: { error: "Something went wrong. Please try again later" },
    };
  }
};

export const archiveProduct = async (productId, token) => {
  try {
    const response = await fetch(
      `${process.env.REACT_APP_BASE_URL}/products/archive/${productId}`,
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
    console.error("Error in archiving product", error);
    return {
      status: 500,
      data: { error: "Something went wrong. Please try again later" },
    };
  }
};

export const createProduct = async (payload, token) => {
  try {
    const response = await fetch(
      `${process.env.REACT_APP_BASE_URL}/products/`,
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
    console.error("Error in creating product", error);
    return {
      status: 500,
      data: { error: "Something went wrong. Please try again later" },
    };
  }
};

export const getActiveProducts = async () => {
  try {
    const response = await fetch(
      `${process.env.REACT_APP_BASE_URL}/products/active`
    );
    const data = await response.json();
    console.debug(data);

    return { status: response.status, data };
  } catch (error) {
    console.error("Error in retrieving active products", error);
    return {
      status: 500,
      data: { error: "Something went wrong. Please try again later" },
    };
  }
};

export const getAllProducts = async () => {
  try {
    const response = await fetch(
      `${process.env.REACT_APP_BASE_URL}/products/all`
    );
    const data = await response.json();
    console.debug(data);

    return { status: response.status, data };
  } catch (error) {
    console.error("Error in retrieving products", error);
    return {
      status: 500,
      data: { error: "Something went wrong. Please try again later" },
    };
  }
};

export const getProductById = async (productId) => {
  try {
    const response = await fetch(
      `${process.env.REACT_APP_BASE_URL}/products/${productId}`
    );
    const data = await response.json();
    console.debug(data);

    return { status: response.status, data };
  } catch (error) {
    console.error("Error in retrieving product by id", error);
    return {
      status: 500,
      data: { error: "Something went wrong. Please try again later" },
    };
  }
};

export const getProductReviews = async (productId) => {
  try {
    const response = await fetch(
      `${process.env.REACT_APP_BASE_URL}/products/${productId}/reviews`
    );
    const data = await response.json();
    console.debug(data);

    return { status: response.status, data };
  } catch (error) {
    console.error("Error in retrieving product reviews", error);
    return {
      status: 500,
      data: { error: "Something went wrong. Please try again later" },
    };
  }
};

export const getProductStatistics = async (productId) => {
  try {
    const response = await fetch(
      `${process.env.REACT_APP_BASE_URL}/products/${productId}/productStatistics`
    );
    const data = await response.json();
    console.debug(data);

    return { status: response.status, data };
  } catch (error) {
    console.error("Error in retrieving product statistics", error);
    return {
      status: 500,
      data: { error: "Something went wrong. Please try again later" },
    };
  }
};

export const updateProduct = async (productId, payload, token) => {
  try {
    const response = await fetch(
      `${process.env.REACT_APP_BASE_URL}/products/${productId}`,
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
    console.error("Error in updating product", error);
    return {
      status: 500,
      data: { error: "Something went wrong. Please try again later" },
    };
  }
};
