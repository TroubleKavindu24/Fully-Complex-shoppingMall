import React, { useState, useEffect } from "react";
import axios from "axios";
import "./myStyles.css";
import { useParams } from "react-router-dom";

const OrderPost = () => {
  const [post, setPost] = useState({});
  const { id } = useParams();

  useEffect(() => {
    axios.get(`http://localhost:8070/order/${id}`).then((res) => {
      if (res.data.success) {
        setPost(res.data.post);
      }
    });
  }, [id]);

  const { name, contactNo, orderDate, status, cartTotal } = post;

  return (
    <div>
      <div className="container">
        <br />
        <div style={{ fontSize: "15px" }}>
          <a href="/order/home" className="previous" style={{ color: "white" }}>
            &laquo; Previous
          </a>
        </div>
        <div className="row">
          <div className="col-6">
            <div style={{ marginTop: "20px", fontSize: "25px" }}>
              <h1>{name}</h1>
              <hr />
              <dl className="row" style={{ fontSize: "20px" }}>
                <dt className="col-sm-3">Contact No</dt>
                <dd className="col-sm-9">{contactNo}</dd>
                <dt className="col-sm-3">Order Date</dt>
                <dd className="col-sm-9">{orderDate}</dd>
                <dt className="col-sm-3">Status</dt>
                <dd className="col-sm-9">{status}</dd>
                <dt className="col-sm-3">Order Total</dt>
                <dd className="col-sm-9">{cartTotal}</dd>
              </dl>
            </div>
          </div>
          <div className="col-6">
            <div className="imageprofile">
              <img
                src="https://mir-s3-cdn-cf.behance.net/project_modules/disp/14cb6b84808917.5d68451d7d126.gif"
                alt=""
                className="rounded-circle"
                style={{ marginLeft: "50%", height: "50%", width: "50%" }}
              />
            </div>
          </div>
        </div>
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
      </div>
    </div>
  );
};

export default OrderPost;
