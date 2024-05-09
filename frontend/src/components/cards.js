import React, { Component } from "react";
import "./commom.css";
import shop from "../images/shop.gif";
import customer from "../images/customer.gif";
import employee from "../images/employee.gif";
import brands from "../images/brands.gif";

export default class Cards extends Component {
  render() {
    return (
      <>
        <div className="title2">Currently Available With Us</div>
        <div className="row">
          <div className="col">
            <img src={shop} className="imageCircle" />
            <div className="title">90+ shops </div>
          </div>
          <div className="col">
            <img src={customer} className="imageCircle" />
            <div className="title">100000+ customers </div>
          </div>
          <div className="col">
            <img src={employee} className="imageCircle" />
            <div className="title">200+ employees </div>
          </div>
          <div className="col">
            <img src={brands} className="imageCircle2" />
            <div className="title">2000+ brands </div>
          </div>
        </div>
      </>
    );
  }
}
