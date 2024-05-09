import React, { Component } from "react";
import admin from "../images/admin.jpg";
import event from "../images/event.jpg";
import shop from "../images/shop.png";
import "./commom.css";

export default class SlideShow extends Component {
  render() {
    return (
      <div
        id="carouselExampleIndicators"
        class="carousel slide slideshow"
        data-ride="carousel"
      >
        <ol class="carousel-indicators">
          <li
            data-target="#carouselExampleIndicators"
            data-slide-to="0"
            class="active"
          ></li>
          <li data-target="#carouselExampleIndicators" data-slide-to="1"></li>
          <li data-target="#carouselExampleIndicators" data-slide-to="2"></li>
        </ol>
        <div class="carousel-inner">
          <div class="carousel-item active">
            <img
              class="d-block w-100 slideshow"
              src={admin}
              alt="First slide"
            />
          </div>
          <div class="carousel-item">
            <img
              class="d-block w-100 slideshow"
              src={event}
              alt="Second slide"
            />
          </div>
          <div class="carousel-item slideshow">
            <img class="d-block w-100" src={shop} alt="Third slide" />
          </div>
        </div>
        <a
          class="carousel-control-prev"
          href="#carouselExampleIndicators"
          role="button"
          data-slide="prev"
        >
          <span class="carousel-control-prev-icon" aria-hidden="true"></span>
          <span class="sr-only">Previous</span>
        </a>
        <a
          class="carousel-control-next"
          href="#carouselExampleIndicators"
          role="button"
          data-slide="next"
        >
          <span class="carousel-control-next-icon" aria-hidden="true"></span>
          <span class="sr-only">Next</span>
        </a>
      </div>
    );
  }
}
