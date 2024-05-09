import React, { Component } from "react";
import NavBar from "./NavBar";
import CreateOrders from "../screen/order-Management/CreateOrder";
import Footer from "./footer";

export default class OrderPage extends Component {
    render() {
        return (
            <>
                <NavBar />
                <br />
                <br />
                <CreateOrders />
                <br />
                <br />
                <Footer />
            </>
        );
    }
}
