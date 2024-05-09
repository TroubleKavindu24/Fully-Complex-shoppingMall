import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Grid from "@material-ui/core/Grid";
import AdminNav from "../../components/admin-Nav";
import DashboardCard from "../../components/DashboardCard";
import Cards from "./Cards";

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    height: "270px",
    width: "100%",
    flexDirection: "column",
    alignItems: "flex-start",
    paddingTop: "5vh",
    alignText: "start",
    paddingLeft: "15vw",
    overflow: "hidden",
    position: "relative",
  },
  content: {
    padddingLeft: "100px",
  },
  row: {
    display: "flex",
    height: "25vh",
    width: "70vw",
    textAlign: "start",
    justifyContent: "space-around",
    marginBottom: theme.spacing(2),
  },
  card: {
    width: "260px",
  },
  container: {
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-start",
    justifyContent: "flex-start",
    paddingLeft: "15vw",
    padding: theme.spacing(2),
    paddingTop: "5vh",
    textAlign: "center",
    height: "100%",
    width: "100%",
    zIndex: 1,
    position: "absolute",
    top: 0,
    left: 40,
    backgroundColor: "rgba(255,255,255,0.4)",
  },
  illustration: {
    position: "absolute",
    zIndex: 0,
    width: "100%",
    height: "92vh",
  },
}));

const AdminDashboard = () => {
  const classes = useStyles();

  return (
    <>
      <div className={classes.root}>
        <AdminNav />
        <main className={classes.content}>
          <div className={classes.toolbar} />
          <div className={classes.container}>
            <Typography variant="h4" gutterBottom>
              {" "}
              Admin Dashboard
            </Typography>
            <div className={classes.row}>
              <DashboardCard icon="people" title="Customers" value="100+" />
              <DashboardCard icon="store" title="Per. Stalls" value="100+" />
              <DashboardCard
                icon="storefront"
                title="Temp. Stalls"
                value="100+"
              />
              <DashboardCard icon="business" title="Sellers" value="100+" />
              <DashboardCard icon="event" title="Events" value="100+" />
            </div>
          </div>
        </main>
      </div>
      <Cards />
    </>
  );
};

export default AdminDashboard;
