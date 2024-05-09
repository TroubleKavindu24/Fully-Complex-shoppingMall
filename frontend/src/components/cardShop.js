import React, { useState } from "react";
import "./commom.css";

export default function CardShop() {
  const shopsData = {
    floor1: [
      {
        name: "Carnage",
        logo: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSWr69Pq1zTmSi1texosRDMRnjsaUMnTX_0THzt9Bp6pzRt3kDlUNrOCCrx7jjOoo3Tvss&usqp=CAU",
      },
      {
        name: "Bubble Mania",
        logo: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTCShmmA_B42Yr88y87GY-wBeeCw85q_BR_KwqmG7dpCA&s",
      },
      {
        name: "Cargills Mall",
        logo: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQKdp-qUAyQKMWr9wjUEzHMSbV--79wVgMmcg2C58NMCA&s",
      },
      {
        name: "ODEL",
        logo: "https://pbs.twimg.com/profile_images/980865257710133248/eZ2wY1g2_400x400.jpg",
      },
      {
        name: "Spa Ceylon",
        logo: "https://image.isu.pub/230818114412-9c6690a489e3dad4cd16c7566898c08c/jpg/page_1_thumb_large.jpg",
      },
    ],
    floor2: [
      {
        name: "Carnage",
        logo: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSWr69Pq1zTmSi1texosRDMRnjsaUMnTX_0THzt9Bp6pzRt3kDlUNrOCCrx7jjOoo3Tvss&usqp=CAU",
      },
      {
        name: "FOA",
        logo: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQJChzreeLkSgqlE_XVfx_IeQotu7HK7P1mM3mlHyAZFw&s",
      },
      {
        name: "Cargills Mall",
        logo: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQKdp-qUAyQKMWr9wjUEzHMSbV--79wVgMmcg2C58NMCA&s",
      },
      {
        name: "ODEL",
        logo: "https://pbs.twimg.com/profile_images/980865257710133248/eZ2wY1g2_400x400.jpg",
      },
      {
        name: "FOA",
        logo: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQJChzreeLkSgqlE_XVfx_IeQotu7HK7P1mM3mlHyAZFw&s",
      },
      ,
    ],
    floor3: [
      {
        name: "FOA",
        logo: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQJChzreeLkSgqlE_XVfx_IeQotu7HK7P1mM3mlHyAZFw&s",
      },
      {
        name: "Bubble Mania",
        logo: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTCShmmA_B42Yr88y87GY-wBeeCw85q_BR_KwqmG7dpCA&s",
      },
      {
        name: "FOA",
        logo: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQJChzreeLkSgqlE_XVfx_IeQotu7HK7P1mM3mlHyAZFw&s",
      },
      {
        name: "ODEL",
        logo: "https://pbs.twimg.com/profile_images/980865257710133248/eZ2wY1g2_400x400.jpg",
      },
      {
        name: "Spa Ceylon",
        logo: "https://image.isu.pub/230818114412-9c6690a489e3dad4cd16c7566898c08c/jpg/page_1_thumb_large.jpg",
      },
    ],
  };
  const [selectedFloor, setSelectedFloor] = useState("floor1");

  const handleTabClick = (floor) => {
    setSelectedFloor(floor);
  };
  return (
    <>
      <div className="shop-box" style={{ backgroundColor: "#f0f0f0" }}>
        {" "}
        {/* Add background color style here */}
        <div className="tabs">
          <button onClick={() => handleTabClick("floor1")}>Floor 1</button>
          <button onClick={() => handleTabClick("floor2")}>Floor 2</button>
          <button onClick={() => handleTabClick("floor3")}>Floor 3</button>
        </div>
        <div className="shop-list">
          {shopsData[selectedFloor].map((shop, index) => (
            <div className="shop-card" key={index}>
              <img src={shop.logo} alt={shop.name} />
              <h3>{shop.name}</h3>
            </div>
          ))}
        </div>
        <br />
      </div>
      <br />
    </>
  );
}
