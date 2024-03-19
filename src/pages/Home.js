import React from "react";
import { useContext } from "react";
import UserContext from "../context/UserContext";
import Products from "../components/Products";
import ProductsDashboard from "../components/ProductsDashboard";

const Home = () => {
  const { user } = useContext(UserContext);

  return <>{user.isAdmin ? <ProductsDashboard /> : <Products />}</>;
};

export default Home;
