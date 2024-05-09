import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import {
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  Button,
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  Grid,
} from "@material-ui/core";
import {
  ShoppingCart as ShoppingCartIcon,
  AccountCircle as AccountCircleIcon,
} from "@material-ui/icons";
import { Link } from "react-router-dom";
import axios from "axios";
import CustomerNav from "../../../components/customer-Nav";
import { API_URL } from "../../../constants/constants";
import shopImage from "../../../images/shop.png";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    height: "99.5vh",
    width: "100vw",
    overflow: "hidden",
    position: "relative",
  },
  title: {
    flexGrow: 1,
    textAlign: "left",
  },
  link: {
    color: "inherit",
    textDecoration: "none",
  },
  leftNavLink: {
    display: "flex",
    alignItems: "center",
    float: "left",
    marginRight: theme.spacing(2),
    "&>*": {
      marginRight: theme.spacing(2),
      color: "inherit",
    },
  },
  rightNavLink: {
    display: "flex",
    alignItems: "center",
    float: "right",
  },
  nac: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },
  hero: {
    background: 'url("/path/to/hero-image.jpg")',
    backgroundSize: "cover",
    height: "400px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    color: "#fff",
    textAlign: "center",
  },
  gridContainer: {
    marginTop: theme.spacing(4),
    padding: theme.spacing(3),
  },
  card: {
    maxWidth: 345,
  },
  media: {
    height: 140,
  },
  appTitle: {
    textAlign: "center",
    marginTop: theme.spacing(4),
    marginBottom: theme.spacing(4),
  },
  container: {
    padding: theme.spacing(3),
    height: "99.5vh",
    width: "98.5vw",
    background: "rgba(255,255,255,0.8)",
    backdropFilter: "blur(5px)",
    position: "absolute",
    top: "70px",
    zIndex: 1,
  },
  subContainer: {},
  illustration: {
    position: "absolute",
    zIndex: 0,
    left: 0,
    width: "100%",
    height: "92vh",
  },
}));

const PermanentShopHomePage = () => {
  const classes = useStyles();
  const [shops, setShops] = useState([]);

  //   useEffect(() => {
  //     const getData = async () => {
  //       const response = await axios.get(API_URL + "/permanentShop/get");
  //       const data = await response.data;
  //       setShops(data.permanentShops);
  //       console.log(shops);
  //     };
  //     getData();
  //   }, [shops]);

  useEffect(() => {
    const fetchShops = async () => {
      try {
        const response = await axios.get(API_URL + "/permanentShop/get");
        setShops(response.data.permanentShops);
      } catch (error) {
        console.error("Error fetching shops:", error);
      }
    };
    fetchShops();
  }, []);

  return (
    <div className={classes.root}>
      {/* <CustomerNav /> */}
      <Grid container justify="center">
        <Grid item>
          <img
            src={shopImage}
            alt="login illustration"
            className={classes.illustration}
          />
        </Grid>
      </Grid>
      <div className={classes.container}>
        <div className={classes.subContainer}>
          <Typography variant="h4" className={classes.appTitle}>
            {" "}
            Permanent Shops
          </Typography>
          <hr />
          <Grid container spacing={3} className={classes.gridContainer}>
            {shops.map((shop) => (
              <Grid item xs={12} sm={6} md={3} key={shop.shopID}>
                <Card className={classes.card}>
                  <CardActionArea component={Link} to={`/shop`}>
                    <CardMedia
                      className={classes.media}
                      image={shop.imageUrl || shopImage} // Assuming shop.image contains the URL of the image
                      title={shop.shopName}
                    />
                    <CardContent>
                      <Typography gutterBottom variant="h5" component="h2">
                        {shop.shopName}
                      </Typography>
                      <Typography gutterBottom variant="h6" component="h5">
                        Visit us at floor {shop.floor}
                      </Typography>
                      <Typography gutterBottom variant="h6" component="p">
                        {shop.description}
                      </Typography>
                      <Button
                        variant="contained"
                        color="primary"
                        component={Link}
                        to={`/shop/${shop.shopID}`}
                        onClick={() => {
                          localStorage.setItem("shop", shop.shopID);
                          localStorage.setItem("shopName", shop.shopName);
                        }}
                      >
                        Shop Now
                      </Button>
                    </CardContent>
                  </CardActionArea>
                </Card>
              </Grid>
            ))}
          </Grid>
        </div>
      </div>
    </div>
  );
};

export default PermanentShopHomePage;
