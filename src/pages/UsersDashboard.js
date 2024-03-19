import React, { useContext, useEffect, useState } from "react";
import { Button, Container, Table } from "react-bootstrap";
import { Navigate } from "react-router-dom";
import UserContext from "../context/UserContext";
import { getAllUsers, updateUserAsAdmin } from "../services/userService";
import Swal from "sweetalert2";

const UsersDashboard = () => {
  const { user } = useContext(UserContext);
  const [usersData, setUsersData] = useState([]);
  const [users, setUsers] = useState([]);

  const fetchAllUsers = async () => {
    const token = localStorage.getItem("token");
    const allUsersResponse = await getAllUsers(token);

    if (allUsersResponse.status === 200 && allUsersResponse.data.users) {
      setUsersData(allUsersResponse.data.users);
    }
  };

  const setUserAsAdmin = async (userId) => {
    const token = localStorage.getItem("token");
    const setUserAsAdminResponse = await updateUserAsAdmin(userId, token);

    if (setUserAsAdminResponse.status === 200) {
      Swal.fire("Success", setUserAsAdminResponse.data.message, "success");
      fetchAllUsers();
    } else {
      Swal.fire("Error", setUserAsAdminResponse.data.error, "error");
    }
  };

  useEffect(() => {
    fetchAllUsers();
  }, []);

  useEffect(() => {
    const userList = usersData.map((userData) => {
      return (
        <tr key={userData._id}>
          <td>
            {userData.firstName} {userData.lastName}
          </td>
          <td>{userData.email}</td>
          <td>{userData.mobileNo}</td>
          <td>{userData.isAdmin ? "Admin" : "User"}</td>
          <td>
            {!userData.isAdmin && (
              <Button
                variant="primary"
                onClick={() => setUserAsAdmin(userData._id)}
              >
                Set User As Admin
              </Button>
            )}
          </td>
        </tr>
      );
    });
    setUsers(userList);
  }, [usersData]);

  return (
    <>
      {user.id === null ? (
        <Navigate to="/" />
      ) : (
        <>
          <Container fluid>
            <h1 className="text-center my-4"> Users Dashboard</h1>

            <Table striped bordered hover responsive>
              <thead>
                <tr className="text-center">
                  <th>Name</th>
                  <th>Email</th>
                  <th>Mobile No.</th>
                  <th>Role</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>{users}</tbody>
            </Table>
          </Container>
        </>
      )}
    </>
  );
};

export default UsersDashboard;
