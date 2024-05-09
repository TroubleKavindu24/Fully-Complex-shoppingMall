import React, { useState, useEffect } from "react";
import axios from "axios";
import swal from "sweetalert";
import "./myStyles.css";
import { useParams } from "react-router-dom";
import AdminNav from "../../components/admin-Nav";
import "./order.css";

const EditOrder = () => {
  const [formData, setFormData] = useState({
    name: "",
    contactNo: "",
    orderDate: "",
    status: "",
  });

  const { id } = useParams();

  useEffect(() => {
    axios.get(`http://localhost:8070/order/${id}`).then((res) => {
      if (res.data.success) {
        const postData = res.data.post;
        setFormData({
          name: postData.name,
          contactNo: postData.contactNo,
          orderDate: postData.orderDate,
          status: postData.status,
        });
      }
    });
  }, [id]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const onSubmit = (e) => {
    e.preventDefault();

    const data = { ...formData };

    axios
      .put(`http://localhost:8070/order/update/${id}`, data)
      .then((res) => {
        if (res.data.success) {
          swal("Update Successful", "Update is recorded", "success");
          setFormData({
            name: "",
            contactNo: "",
            orderDate: "",
            status: "",
          });
        }
      })
      .catch((error) => {
        console.error("Error updating order:", error);
      });
  };

  return (
    <div>
      <AdminNav />
      <div className="container">
        <br />
        <div style={{ fontSize: "15px" }}>
          <a href="/order/home" className="previous" style={{ color: "white" }}>
            &laquo; Previous
          </a>
        </div>
        <div className="container cont">
          <div className="cardmy">
            <div
              className="card card1"
              style={{ width: "50%", marginRight: "50%" }}
            >
              <div className="card-body">
                <div className="col-md-8 mt-4 mx-auto">
                  <h1
                    className="h3 mb-3 font-weight-normal text-center"
                    style={{ fontSize: "29px" }}
                  >
                    Order Detail Edit Form{" "}
                  </h1>
                  <form className="needs-validation">
                    <div
                      className="form-group"
                      style={{ marginBottom: "15px" }}
                    >
                      <label style={{ marginBottom: "5px" }} className="topic">
                        Customer Name:{" "}
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        name="name"
                        placeholder="Enter Your Name"
                        value={formData.name}
                        readOnly
                        onChange={handleInputChange}
                      />
                    </div>

                    <div
                      className="form-group"
                      style={{ marginBottom: "15px" }}
                    >
                      <label style={{ marginBottom: "5px" }} className="topic">
                        Contact Number
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        name="contactNo"
                        placeholder="Enter Contact Number"
                        value={formData.contactNo}
                        onChange={handleInputChange}
                      />
                    </div>

                    <div
                      className="form-group"
                      style={{ marginBottom: "15px" }}
                    >
                      <label style={{ marginBottom: "5px" }} className="topic">
                        Order Date
                      </label>
                      <input
                        type="date"
                        className="form-control"
                        name="orderDate"
                        placeholder="Date"
                        value={formData.orderDate}
                        onChange={handleInputChange}
                      />
                    </div>

                    <div
                      className="form-group"
                      style={{ marginBottom: "15px" }}
                    >
                      <label style={{ marginBottom: "5px" }} className="topic">
                        Status
                      </label>
                      <div
                        className="form-group"
                        style={{ marginBottom: "15px" }}
                      >
                        <select
                          className="form-control"
                          name="status"
                          value={formData.status}
                          onChange={handleInputChange}
                        >
                          <option value="pending">Pending</option>
                          <option value="delivered">Delivered</option>
                          <option value="dispatched">Dispatched</option>
                        </select>
                      </div>
                    </div>

                    <br />

                    <div className="text-center">
                      <button
                        className="btn btn-success textsize"
                        type="submit"
                        style={{
                          marginTop: "10px",
                          width: "200px",
                          height: "40px",
                        }}
                        onClick={onSubmit}
                      >
                        <i className="far fa-check-square"></i>
                        &nbsp; Update
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>

          <br />
          <br />
        </div>
      </div>
    </div>
  );
};

export default EditOrder;
