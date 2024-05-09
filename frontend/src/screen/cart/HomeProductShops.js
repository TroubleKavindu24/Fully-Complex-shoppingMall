import React, { useEffect, useState } from "react";
import ShopProducts from "./ShopProducts";
import "./productstyles.css";
import axios from "axios";
import { API_URL } from "../../constants/constants";
import NavBar from "../../components/NavBar";

const HomeProductShops = () => {
  const [items, setItems] = useState([]);
  const shopId = localStorage.getItem("shop"); // Use the key that holds the correct shop ID

  useEffect(() => {
    if (shopId) {
      getData(shopId); // Pass the correct shop ID to fetch data
    } else {
      console.error("Shop ID not found in localStorage");
    }
  }, [shopId]);

  const getData = async (shopId) => {
    try {
      const response = await axios.get(
        `${API_URL}/item/item/get-by-shop/${shopId}`
      ); // Using correct ID to fetch data
      setItems(response.data.items);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  return (
    <div>
      <NavBar />
      {/* Handle if shopId is not valid */}
      {shopId ? (
        <section className="container">
          <div
            className="row justify-content-center"
            style={{ marginTop: "25px" }}
          >
            {items.map((item, index) => (
              <ShopProducts
                key={index}
                id={item.itemID}
                img={item.itemImage}
                title={item.itemName}
                desc={item.itemDescription}
                price={item.itemPrice}
              />
            ))}
          </div>
        </section>
      ) : (
        <div>Shop ID not found or invalid.</div>
      )}
    </div>
  );
};

export default HomeProductShops;
