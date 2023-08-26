import React from "react";
import { Col, Row } from "react-bootstrap";
import storeItems from "../data/items.json";
import StoreItem from "./StoreItem";
import NavBar from "../component/NavBar";
import { Products } from "./Products";
import { Navbar } from "./Navbar";
import { useAuth } from "../context/AuthContext";
const Store = () => {
  const {user}= useAuth
  return (
    <>
                <Navbar user={user} />

                <Products/>
    </>
  );
};

export default Store;
