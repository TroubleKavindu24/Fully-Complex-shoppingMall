import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import {
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  Button,
} from "@material-ui/core";
import {
  ShoppingCart as ShoppingCartIcon,
  AccountCircle as AccountCircleIcon,
} from "@material-ui/icons";
import { Link } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    width: "100vw",
    height: "8vh",
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
    height: "8vh",
  },
}));

const CustomerNav = () => {
  const classes = useStyles();
  const [user, setUser] = useState(localStorage.getItem("user"));

  const handleLogout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("shop");
    localStorage.removeItem("shopName");
    setUser(null);
  };
  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar className={classes.nac}>
          <div className={classes.leftNavLink}>
            <Typography variant="h6" className={classes.title}>
              <Link to="/" className={classes.link}>
                Emporium
              </Link>
            </Typography>
            <Button variant="outlined" className={classes.title}>
              <Link to="/permenentshop_home" className={classes.link}>
                Shops
              </Link>
            </Button>
            <Button variant="outlined" className={classes.title}>
              <Link to="/temporyshop_home" className={classes.link}>
                Stalls
              </Link>
            </Button>
            <Button variant="outlined" className={classes.title}>
              <Link to="/event_home" className={classes.link}>
                Events
              </Link>
            </Button>
          </div>

          <div className={classes.rightNavLink}>
            <IconButton color="inherit" component={Link} to="/cart">
              <ShoppingCartIcon />
            </IconButton>
            <IconButton color="inherit" component={Link} to="/profile">
              <AccountCircleIcon />
            </IconButton>
            {!user ? (
              <>
                <Button color="inherit" component={Link} to="/signin">
                  Login
                </Button>
                <Button color="inherit" component={Link} to="/signup">
                  Register
                </Button>
              </>
            ) : (
              <Button
                color="inherit"
                component={Link}
                to="/login"
                onClick={handleLogout}
              >
                Logout
              </Button>
            )}
          </div>
        </Toolbar>
      </AppBar>
    </div>
  );
};

export default CustomerNav;
