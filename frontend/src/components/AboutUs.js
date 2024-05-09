import React from "react";
import { Card, CardContent, Grid, Typography } from "@material-ui/core";
import "./card.css";

const AboutUs = () => {
  return (
    <div className="root">
      <Card className="card">
        {/* Left side */}
        <CardContent className="cardContent">
          <div className="row">
            <div className="col list">
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <Typography variant="body1" className="text">
                    About Us
                  </Typography>
                </Grid>
                <Grid item xs={12}>
                  <Typography variant="body1">Your Location</Typography>
                </Grid>
                <Grid item xs={12}>
                  <Typography variant="body1">Your Company Name</Typography>
                </Grid>
                <Grid item xs={12}>
                  <Typography variant="body1">123-456-7890</Typography>
                </Grid>
                <Grid item xs={12}>
                  <Typography variant="body1">info@example.com</Typography>
                </Grid>
                {/* Add more details as needed */}
              </Grid>
            </div>
            <div className="col">
              <img
                src="https://ict4peace.files.wordpress.com/2009/03/colombo-on-google-maps.png"
                alt="Company"
                className="image"
              />
            </div>
          </div>
        </CardContent>
      </Card>
      <br />
      <br />
    </div>
  );
};

export default AboutUs;
