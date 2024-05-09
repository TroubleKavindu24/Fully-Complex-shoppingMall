import React, { Component } from "react";
import NavBar from "./NavBar";
import SlideShow from "./slideShow";
import Cards from "./cards";
import Footer from "./footer";
import CardDeals from "./CardDeals";
import CardShop from "./cardShop";
import AboutUs from "./AboutUs";

export default class Home extends Component {
  render() {
    return (
      <>
        <NavBar />
        <SlideShow />
        <br />
        <br />
        <CardShop />
        <Cards />
        <CardDeals />
        <AboutUs />
        <Footer />
      </>
    );
  }
}
