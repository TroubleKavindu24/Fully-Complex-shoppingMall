import React, { Component } from "react";
import NavBar from "./NavBar";
import HomeCart from "../screen/cart/HomeCart";
import Footer from "./footer";

export default class ShopPage extends Component {
    render() {
        return (
            <>
                <NavBar />
               <HomeCart/>
                <br />
                <br />
                <Footer />
            </>
        );
    }
}
