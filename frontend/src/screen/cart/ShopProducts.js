import React, { useEffect, useState } from "react";

const ShopProducts = (props) => {
  return (
    <>
      <div className="col-4">
        <div
          className="card6 p-0 overflow-hidden h-100 shadow"
          style={{ borderRadius: "20px", borderColor: "blue" }}
        >
          <img
            src={props.img}
            className="card-img-top img-fluid"
            alt={props.title}
            style={{ objectFit: "cover", height: "250px" }}
          />
          <div className="card-body text-center">
            <h3 className="card-title">{props.title}</h3>
            <h6 className="card-title">{props.desc}</h6>
            <h3 className="card-title">LKR: {props.price}</h3>
            <button className="btn btn-primary">
              <a
                href="/shop"
                style={{
                  textDecoration: "none",
                  color: "white",
                  fontSize: "15px",
                }}
              >
                Browse More
              </a>
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default ShopProducts;
