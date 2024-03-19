export const getAllUsers = async (token) => {
  try {
    const response = await fetch(`${process.env.REACT_APP_BASE_URL}/users/`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    const data = await response.json();
    console.debug(data);

    return { status: response.status, data };
  } catch (error) {
    console.error("Error in retrieving all users", error);
    return {
      status: 500,
      data: { error: "Something went wrong. Please try again later" },
    };
  }
};

export const getUserDetails = async (token) => {
  try {
    const response = await fetch(
      `${process.env.REACT_APP_BASE_URL}/users/details`,
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
    console.error("Error in user registration", error);
    return {
      status: 500,
      data: { error: "Something went wrong. Please try again later" },
    };
  }
};

export const loginUser = async (payload) => {
  try {
    const response = await fetch(
      `${process.env.REACT_APP_BASE_URL}/users/login`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      }
    );

    const data = await response.json();
    console.debug(data);

    return { status: response.status, data };
  } catch (error) {
    console.error("Error in user registration", error);
    return {
      status: 500,
      data: { error: "Something went wrong. Please try again later" },
    };
  }
};

export const registerUser = async (payload) => {
  try {
    const response = await fetch(`${process.env.REACT_APP_BASE_URL}/users/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });

    const data = await response.json();
    console.debug(data);

    return { status: response.status, data };
  } catch (error) {
    console.error("Error in user registration", error);
    return {
      status: 500,
      data: { error: "Something went wrong. Please try again later" },
    };
  }
};

export const updateUserAsAdmin = async (userId, token) => {
  try {
    const response = await fetch(
      `${process.env.REACT_APP_BASE_URL}/users/${userId}/set-as-admin`,
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
    console.error("Error in updating user as admin", error);
    return {
      status: 500,
      data: { error: "Something went wrong. Please try again later" },
    };
  }
};
