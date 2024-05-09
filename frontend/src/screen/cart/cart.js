import React, { useEffect, useState } from "react";
import axios from "axios";
import { useCart } from "react-use-cart";
import { API_URL } from "../../constants/constants";
import { Link } from "react-router-dom";

const CartPage = () => {
  const {
    isEmpty,
    totalUniqueItems,
    items,
    totalItems,
    updateItemQuantity,
    removeItem,
    emptyCart,
  } = useCart();
  console.log("Items:", items);

  const calculateCartTotal = (items) => {
    let total = 0;
    items.forEach((item) => {
      total += parseFloat(item.itemPrice) * item.quantity;
    });
    return total.toFixed(2);
  };
  const cartTotal = calculateCartTotal(items);

  const cartData = {
    items: items,
    cartTotal: cartTotal,
  };

  useEffect(() => {
    localStorage.setItem("cartData", JSON.stringify(cartData));
    console.log(cartData);
  }, [cartData]);

  return (
    <div style={{ height: "700px" }}>
      <section className="py-4 container">
        <div className="row justify-content-center">
          <div className="col-12">
            <h3 className="text">
              <h2 className="text-center">Shopping Cart</h2>
            </h3>
            <h3 className="text">
              {" "}
              Product Types: ({totalUniqueItems})Total Items: ({totalItems})
            </h3>
            <br />
            <table
              className="table table-light table-hover m-0"
              style={{ fontSize: "20px" }}
            >
              <tbody>
                {items.map((item, index) => {
                  return (
                    <tr key={index}>
                      <td>
                        <img src={item.itemImage} style={{ height: "7rem" }} />
                      </td>
                      <td>{item.itemName}</td>
                      <td>{item.itemPrice}</td>
                      <td> Quantity ({item.quantity})</td>
                      <td>
                        <button
                          style={{ height: "40px", width: "40px" }}
                          className="btn btn-primary m-2"
                          onClick={() =>
                            updateItemQuantity(item.id, item.quantity - 1)
                          }
                        >
                          --
                        </button>
                        <button
                          style={{ height: "40px", width: "40px" }}
                          className="btn btn-primary m-2"
                          onClick={() =>
                            updateItemQuantity(item.id, item.quantity + 1)
                          }
                        >
                          +
                        </button>
                        <button
                          style={{ height: "40px", width: "120px" }}
                          className="btn btn-danger ms-2"
                          onClick={() => removeItem(item.id)}
                        >
                          Remove Item
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>

          <div className="col-auto ms-auto">
            <br />
            <br />
            <h3>Total Price: Rs.{cartTotal}</h3>
          </div>
          <br />
          <div className="col-auto">
            <br />
            <button
              className="btn btn-danger m-2"
              onClick={() => emptyCart()}
              style={{ height: "40px", width: "90px" }}
            >
              Clear Cart
            </button>
            <br />
            {/* <button className="btn btn-primary m-2">
              <a
                href="/order"
                style={{
                  textDecoration: "none",
                  color: "white",
                  fontSize: "18px",
                }}
              >
                Proceed to Checkout
              </a>
            </button> */}
            {/* Rest of your component JSX */}
            <button className="btn btn-primary m-2">
              <Link
                to={{
                  pathname: "/meetAtMall",
                  state: { cartData: cartData },
                }}
                style={{
                  textDecoration: "none",
                  color: "white",
                  fontSize: "18px",
                }}
              >
                Meet At The Mall
              </Link>
            </button>
            <button className="btn btn-primary m-2">
              <Link
                to={{
                  pathname: "/order",
                  state: { cartData: cartData },
                }}
                style={{
                  textDecoration: "none",
                  color: "white",
                  fontSize: "18px",
                }}
              >
                Proceed to Checkout
              </Link>
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default CartPage;
