import React from "react";
import { Card, CardContent, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import {
  People as PeopleIcon,
  Store as StoreIcon,
  Storefront as StorefrontIcon,
  BusinessCenter as BusinessCenterIcon,
  Event as EventIcon,
} from "@material-ui/icons";

const useStyles = makeStyles((theme) => ({
  card: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    padding: theme.spacing(2),
    borderRadius: "5px",
    margin: theme.spacing(1),
    width: "360px", // Adjust width as needed
    backgroundColor: "#E1ECF9 ",
  },
  icon: {
    fontSize: "50px", // Adjust icon size as needed
    marginTop: "15px",
  },
  people: {
    color: "#1976d2", // Blue color
  },
  store: {
    color: "#388e3c", // Green color
  },
  storefront: {
    color: "#f57c00", // Orange color
  },
  business: {
    color: "#7b1fa2", // Purple color
  },
  event: {
    color: "#e91e63", // Pink color
  },
}));

const DashboardCard = ({ icon, title, value }) => {
  const classes = useStyles();

  const getIconComponent = () => {
    switch (icon) {
      case "people":
        return <PeopleIcon className={`${classes.icon} ${classes.people}`} />;
      case "store":
        return <StoreIcon className={`${classes.icon} ${classes.store}`} />;
      case "storefront":
        return (
          <StorefrontIcon className={`${classes.icon} ${classes.storefront}`} />
        );
      case "business":
        return (
          <BusinessCenterIcon
            className={`${classes.icon} ${classes.business}`}
          />
        );
      case "event":
        return <EventIcon className={`${classes.icon} ${classes.event}`} />;
      default:
        return null;
    }
  };

  return (
    <Card className={classes.card}>
      {getIconComponent()}
      <CardContent>
        <Typography gutterBottom variant="h6" component="h3">
          {title}
        </Typography>
        <Typography variant="h5" component="h2" color="textSecondary">
          {value}
        </Typography>
      </CardContent>
    </Card>
  );
};

export default DashboardCard;
