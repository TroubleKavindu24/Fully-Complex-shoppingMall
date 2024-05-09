import React, { useEffect, useState, useContext } from "react";
import { UserContext } from "../../App";
import "./profile.css"; // Import CSS file for custom styling

export default function Profile() {
  const [mypics, setPics] = useState([]);
  const { state, dispatch } = useContext(UserContext);

  useEffect(() => {
    fetch("http://localhost:8070/mypost", {
      headers: {
        Authorization: "Bearer " + localStorage.getItem("jwt"),
      },
    })
      .then((res) => res.json())
      .then((result) => {
        setPics(result.mypost);
      });
  }, []);

  return (
    <div className="profile-container">
      <hr />
      <h4 className="profile-heading">
        <b><u>My Profile</u></b>
      </h4>
      <div className="profile-info">
        <div className="profile-image-container">
          <img
            className="profile-image"
            src={state ? state.pic : "loading"}
            alt="Profile"
          />
        </div>
        <div className="profile-details">
          <h4>Hello {state ? state.name : "loading"}!</h4>
          <p className="profile-email">Your email: {state ? state.email : "loading"}</p>
        </div>
      </div>
      <hr />
      <div className="gallery">
        {mypics.map((item) => (
          <img
            key={item._id}
            className="gallery-item"
            src={item.photo}
            alt={item.title}
          />
        ))}
      </div>
    </div>
  );
}
