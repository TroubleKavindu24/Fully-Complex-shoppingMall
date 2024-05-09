import React, { useState, useEffect } from "react";
import Stall from "./Stall";
import axios from "axios";
import ColorKey from "./ColorKey";
import "./stall.css";
import swal from "sweetalert";
import NavBar from "../components/NavBar";

const Grid = () => {
  const [stalls, setStalls] = useState([]);
  const [selectedStalls, setSelectedStalls] = useState([]);

  const getPrice = (index) => {
    const columnIndex = index % 9; // 9 columns
    if (columnIndex < 3) {
      return 150000;
    } else if (columnIndex < 6) {
      return 100000;
    } else {
      return 75000;
    }
  };

  useEffect(() => {
    // Fetch initial stall data from the server
    axios.get("http://localhost:8070/stalls").then((response) => {
      setStalls(response.data);
    });
  }, []);

  const handleStallClick = (index) => {
    const updatedStalls = [...stalls];
    const stall = updatedStalls[index];

    if (stall.status === "available") {
      stall.status = "reserved";
      setSelectedStalls((prev) => [...prev, stall._id]);
    } else if (stall.status === "reserved") {
      stall.status = "available";
      setSelectedStalls((prev) => prev.filter((id) => id !== stall._id));
    }

    setStalls(updatedStalls);
  };
  const handleBookStalls = () => {
    const updatedStalls = [...stalls];

    // Update the status of selected stalls to "booked"
    selectedStalls.forEach((id) => {
      const stall = updatedStalls.find((s) => s._id === id);
      if (stall) {
        stall.status = "booked";
      }
    });

    // Save changes to the server
    axios
      .put(`http://localhost:8070/stalls/book`, {
        stallIds: selectedStalls,
      })
      .then(() => {
        setStalls(updatedStalls);
        setSelectedStalls([]);
        swal({
          title: "Your stall has been booked.",
          text: "Do Your Payment at the property",
          icon: "success",
        });
      });
  };

  return (
    <div>
      <NavBar />
      <br />
      <h4>Bookings are taken for the month of May </h4>
      <br />
      <div className="row">
        <div className="col-2">
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "end",
            }}
          >
            <span style={{ paddingBottom: "10px", fontSize: "20px" }}>
              Entrance
            </span>
            <div
              style={{
                borderLeft: "2px solid black",
                height: "500px",
                marginLeft: "10px",
              }}
            ></div>
          </div>
        </div>
        <div className="col-4">
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(9, 50px)",
              marginLeft: "10px",
              gap: "10px",
            }}
          >
            {stalls.map((stall, index) => (
              <Stall
                key={stall._id}
                status={stall.status}
                price={getPrice(index)}
                onClick={() => handleStallClick(index)}
              />
            ))}
          </div>
        </div>
        <div
          className="col"
          style={{
            marginLeft: "70px",
          }}
        >
          <ColorKey />
          <button className="button" onClick={handleBookStalls}>
            Confirm Booking
          </button>
        </div>
      </div>
    </div>
  );
};

export default Grid;
