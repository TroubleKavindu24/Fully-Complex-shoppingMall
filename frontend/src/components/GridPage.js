import React, { Component } from "react";
import NavBar from "./NavBar";
import Grid from "../BookAStall/Grid";
import Footer from "./footer";

export default class GridPage extends Component {
    render() {
        return (
            <>
                <NavBar />
                <Grid/>
                <br/>
                <br />
                <Footer />
            </>
        );
    }
}
