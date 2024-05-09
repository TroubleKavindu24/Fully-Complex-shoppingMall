import React, { Component } from "react";
import axios from "axios";
import jsPdf from "jspdf";
import "jspdf-autotable";
import "./myStyles.css";

class OrderReport extends Component {
  constructor(props) {
    super(props);

    this.state = {
      posts: [],
    };
  }
  componentDidMount() {
    this.retrievePosts();
  }

  retrievePosts() {
    axios.get("http://localhost:8070/orders").then((res) => {
      if (res.data.success) {
        this.setState({
          posts: res.data.existingPosts,
        });
        console.log(this.state.posts);
      }
    });
  }

  // Report pdf generating
  jsPdfGenerator = () => {
    // New document in jspdf
    var doc = new jsPdf("l", "pt", "a3");

    // Company name
    var companyName = "Innovative Trade Plaza Mall- Order Report";
    var title = "Order Report";

    // Add company name and date
    doc.text(600, 20, companyName, { align: "center" });
    doc.text(600, 60, title, { align: "center" });

    // Auto table for order details
    doc.autoTable({ html: "#order-table" });

    doc.autoTable({
      columnStyles: { europe: { halign: "center" } },
      margin: { top: 10 },
    });

    // Save the pdf
    doc.save("Order Details.pdf");
  };

  render() {
    return (
      <div>
        <div className="container">
          <br />
          <div style={{ fontSize: "15px" }}>
            <a href="/order/home" class="previous" style={{ color: "white" }}>
              &laquo; Previous
            </a>
          </div>
          <div className="row">
            <div className="col-9" style={{ letterSpacing: "12px" }}>
              Innovative Trade Plaza Mall
            </div>
            <div className="col-3">Need Help? Call Us: (+94) 11111111</div>
            <hr />
          </div>
          <div className="text-center">
            <br />
            <br />
            <h2 className="adminletter" style={{ fontSize: "25px" }}>
              {" "}
              Order Report{" "}
            </h2>
            <br />
            <br />
          </div>

          <table
            id="order-table"
            className="table table-striped"
            style={{ fontSize: "15px" }}
          >
            <thead className="thead-dark">
              <tr>
                <th scope="col">Order Index</th>
                <th scope="col">Customer Name</th>
                <th scope="col">Contact Number</th>
                <th scope="col">Order Date</th>
                <th scope="col">Status</th>
                <th scope="col">Order Total(LKR)</th>
              </tr>
            </thead>
            <tbody>
              {this.state.posts.map((posts, index) => (
                <tr key={index}>
                  <th scope="row">{index + 1}</th>
                  <td>{posts.name}</td>
                  <td>{posts.contactNo}</td>
                  <td>{posts.orderDate}</td>
                  <td>{posts.status}</td>
                  <td>{posts.cartTotal}</td>
                </tr>
              ))}
            </tbody>
            <br />
            <br />
          </table>

          <br />
          <div style={{ marginLeft: "80%" }}>
            <button
              className="btn btn-primary"
              onClick={this.jsPdfGenerator}
              style={{ width: "170px", height: "40px", fontSize: "15px" }}
            >
              Generate Report PDF
            </button>
          </div>

          <br />
          <br />
          <br />
          <br />
        </div>
      </div>
    );
  }
}
export default OrderReport;
