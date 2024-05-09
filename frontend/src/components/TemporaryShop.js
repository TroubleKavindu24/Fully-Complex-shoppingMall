import React, { Component } from "react";
import NavBar from "./NavBar";
import TemporaryShopHomePage from "../screen/shop/temporary_shop/ShopList";
import Footer from "./footer";

export default class TemporaryPage extends Component {
    render() {
        return (
            <>
                <NavBar />
                <TemporaryShopHomePage />
                <Footer />
            </>
        );
    }
}
