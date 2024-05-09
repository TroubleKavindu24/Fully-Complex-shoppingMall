import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import {
  Typography,
  Grid,
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  Button,
} from "@material-ui/core";
import { Link } from "react-router-dom";
import axios from "axios";
import CustomerNav from "../../components/customer-Nav";
import { API_URL } from "../../constants/constants";
import shopImage from "../../images/shop.png";
import { useCart } from "react-use-cart";
import NavBar from "../../components/NavBar";

const ShopHomePage = (props) => {
  const { addItem } = useCart();

  const handleAddToCart = () => {
    // Ensure that props.item has an itemID property
    if (!props.item.itemID) {
      console.error("Item is missing an itemID property.");
      return;
    }

    // Map itemID to id
    addItem({ id: props.item.itemID, price: props.item.price, ...props.item });
  };

  return (
    <>
      <div className="col-4">
        <div
          className="card6 p-0 overflow-hidden h-100 shadow"
          style={{ borderRadius: "20px", borderColor: "blue" }}
        >
          <img
            src={props.img}
            className="card-img-top img-fluid"
            alt={props.title}
            style={{ objectFit: "cover", height: "250px" }}
          />
          <div className="card-body text-center">
            <h3 className="card-title">{props.title}</h3>
            <h6 className="card-title">{props.desc}</h6>
            <h3 className="card-title">LKR: {props.price}</h3>
            <button className="btn btn-primary" onClick={handleAddToCart}>
              <a
                href="/cart"
                style={{
                  textDecoration: "none",
                  color: "white",
                  fontSize: "15px",
                }}
              >
                Add to Cart
              </a>
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default ShopHomePage;
