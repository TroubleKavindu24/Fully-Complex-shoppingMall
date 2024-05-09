import React, { useEffect, useState } from "react";
import ShopHomePage from "../shop/Shop";
import "./productstyles.css";
import axios from "axios";
import { API_URL } from "../../constants/constants";
import Slider from "rc-slider";
import "rc-slider/assets/index.css";

const HomeCart = () => {
  const [items, setItems] = useState([]);
  const [filteredItems, setFilteredItems] = useState([]);
  const [searchName, setSearchName] = useState("");
  const [priceRange, setPriceRange] = useState([0, 50000]);
  const [shops, setShops] = useState(localStorage.getItem("shop"));
  const [showPopup, setShowPopup] = useState(false);

  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    setShops(localStorage.getItem("shop"));
    console.log(items);
    try {
      const response = await axios.get(API_URL + "/item/get");
      setItems(response.data.items.filter((item) => item.shopID !== shops));
    } catch (error) {
      console.error("Error fetching data: ", error);
    }
  };
  useEffect(() => {
    const filtered = items.filter((item) => {
      const nameMatch = item.itemName
        .toLowerCase()
        .includes(searchName.toLowerCase());
      const priceMatch =
        item.itemPrice >= priceRange[0] && item.itemPrice <= priceRange[1];
      return nameMatch && priceMatch && item.shopID !== shops;
    });

    setFilteredItems(filtered);
  }, [items, searchName, priceRange, shops]);
  return (
    <div>
      <button
        className="filter-button"
        onClick={() => setShowPopup(!showPopup)} // Toggle the popup
      >
        <span role="img" aria-label="filter-icon">
          ⚙️
        </span>{" "}
        Filter
      </button>
      {showPopup && ( // Only show if showPopup is true
        <div className="filter-popup">
          <button
            className="close-button"
            onClick={() => setShowPopup(false)} // Close the popup
          >
            X
          </button>

          {/* Search Input */}
          <div className="filter-controls">
            <label htmlFor="search">Search by name:</label>
            <input
              type="text"
              id="search"
              value={searchName}
              onChange={(e) => setSearchName(e.target.value)}
              placeholder="Enter item name"
            />
          </div>
        </div>
      )}
      <section className="container">
        <div
          className="row justify-content-center"
          style={{ marginTop: "25px" }}
        >
          {filteredItems.map((item, index) => {
            return (
              <ShopHomePage
                id={item.itemID}
                img={item.itemImage}
                title={item.itemName}
                desc={item.itemDescription}
                price={item.itemPrice}
                item={item}
                key={index}
              />
            );
          })}
        </div>
      </section>
    </div>
  );
};

export default HomeCart;
