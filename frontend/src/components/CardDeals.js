import React, { useEffect, useState } from "react";
import "./commom.css";
import axios from "axios";
import { Link } from "react-router-dom";
import {
  Typography,
  Grid,
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  Button,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { API_URL } from "../constants/constants";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    height: "99.5vh",
    width: "100vw",
    overflow: "hidden",
    position: "relative",
  },
  gridContainer: {
    padding: theme.spacing(3),
    marginTop: "0px",
    width: "100%",
    height: "100%",
    border: "2px",
    overflowX: "scroll", // Enable horizontal scrolling
    display: "flex",
    flexWrap: "nowrap", // Keep items in a single line
    borderBlockColor: "black",
  },
  card: {
    maxWidth: 165,
    margin: theme.spacing(2),
    maxHeight: 205,
  },
  media: {
    height: 140,
  },
}));

export default function CardDeals() {
  const classes = useStyles();
  const [items, setItems] = useState([]);
  const [shops, setShops] = useState(localStorage.getItem("shop"));

  useEffect(() => {
    getData();
  }, [items]);

  const getData = async () => {
    setShops(localStorage.getItem("shop"));
    console.log(items);
    try {
      const response = await axios.get(API_URL + "/item/get");
      setItems(response.data.items.filter((item) => item.shopID !== shops));
    } catch (error) {
      console.error("Error fetching data: ", error);
    }
  };

  return (
    <>
      <div style={{ marginTop: "50px" }}>
        <div className="title2"> Our Latest Deals</div>
        <div className={classes.container}>
          <div className={classes.subContainer}>
            <Grid container spacing={3} className={classes.gridContainer}>
              {items.map((item) => (
                <Grid item xs={12} sm={6} md={4} key={item.shopID}>
                  <Card className={classes.card}>
                    <CardActionArea>
                      <CardMedia
                        className={classes.media}
                        image={item.itemImage} // Assuming shop.image contains the URL of the image
                        title={item.itemName}
                      />
                      <CardContent>
                        {item.itemName}
                        <br />
                        Price: ${item.itemPrice}
                      </CardContent>
                    </CardActionArea>
                  </Card>
                </Grid>
              ))}
            </Grid>
          </div>
        </div>
        <div className="btncontainer">
          <button type="button" className="btns">
            <Link
              to="/shop"
              style={{ textDecoration: "none", color: "inherit" }}
            >
              Browse More Products
            </Link>
          </button>
        </div>
      </div>
    </>
  );
}
