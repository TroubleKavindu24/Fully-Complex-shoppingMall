import React from "react";

const ColorKey = () => {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "flex-start",
        padding: "10px",
        marginLeft: "50px",
      }}
    >
      <div style={{ display: "flex", alignItems: "center" }}>
        <div
          style={{
            backgroundColor: "green",
            width: "20px",
            height: "20px",
            marginRight: "10px",
          }}
        ></div>
        <span>Available: Stall is free and can be reserved or booked.</span>
      </div>
      <div style={{ display: "flex", alignItems: "center" }}>
        <div
          style={{
            backgroundColor: "yellow",
            width: "20px",
            height: "20px",
            marginRight: "10px",
          }}
        ></div>
        <span>Reserved: Stall is reserved, pending booking confirmation.</span>
      </div>
      <div style={{ display: "flex", alignItems: "center" }}>
        <div
          style={{
            backgroundColor: "red",
            width: "20px",
            height: "20px",
            marginRight: "10px",
          }}
        ></div>
        <span>Booked: Stall is booked and no longer available.</span>
      </div>
    </div>
  );
};

export default ColorKey;
