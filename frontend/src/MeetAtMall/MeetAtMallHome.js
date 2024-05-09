import React, { Component } from "react";
import axios from "axios";
import jsPdf from "jspdf";
import "jspdf-autotable";
import AdminNav from "../components/admin-Nav";

class MeetAtMallHome extends Component {
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
    axios.get("http://localhost:8070/meetAtMall").then((res) => {
      if (res.data.success) {
        this.setState({
          posts: res.data.existingPosts,
        });
        console.log(this.state.posts);
      }
    });
  }

  filterData(posts, searchKey) {
    const result = posts.filter((post) => post.nic.includes(searchKey));
    this.setState({ posts: result });
  }

  handleSearchArea = (e) => {
    const searchKey = e.currentTarget.value;

    axios.get("http://localhost:8070/meetAtMall").then((res) => {
      if (res.data.success) {
        this.filterData(res.data.existingPosts, searchKey);
      }
    });
  };
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
    doc.save("Other Order Details.pdf");
  };

  render() {
    return (
      <div>
        <AdminNav />
        <div className="container" div style={{ marginLeft: "250px" }}>
          <br />
          <div style={{ fontSize: "12px" }}>
            <a
              href="/admin-dashboard"
              class="previous"
              style={{ color: "white" }}
            >
              &laquo; Previous
            </a>
          </div>
          <div className="text-center">
            <h2 className="adminletter" style={{ fontSize: "30px" }}>
              {" "}
              Other Order Summary{" "}
            </h2>
          </div>
          <div className="col-md-6 mb-4">
            <form class="form-inline">
              <i class="fas fa-search" aria-hidden="true"></i>
              <input
                className="form-control form-control-sm ml-3 w-75"
                type="search"
                placeholder="search"
                name="searchQuery"
                onChange={this.handleSearchArea}
              ></input>
            </form>
          </div>

          <table
            id="order-table"
            class="table table-striped"
            style={{ fontSize: "15px" }}
          >
            <thead>
              <tr>
                <th scope="col">Order Index</th>
                <th scope="col">Customer NIC</th>
                <th scope="col">Collecting Date</th>
                <th scope="col">Collecting Time</th>
                <th scope="col">Order Total(LKR)</th>
                <th scope="col">Items Ordered</th>
              </tr>
            </thead>
            <tbody>
              {this.state.posts.map((posts, index) => (
                <tr key={index}>
                  <th scope="row">{index + 1}</th>
                  <td>{posts.nic}</td>
                  <td>{posts.date}</td>
                  <td>{posts.time}</td>
                  <td>{posts.cartTotal}</td>
                  <td>
                    <table className="table">
                      <thead>
                        <tr>
                          <th>Item ID</th>
                          <th>Item Name</th>
                          <th>Quantity</th>
                        </tr>
                      </thead>
                      <tbody>
                        {posts.items.map((item, itemIndex) => (
                          <tr key={itemIndex}>
                            <td>{item.itemID}</td>
                            <td>{item.itemName}</td>
                            <td>{item.quantity}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </td>
                </tr>
              ))}
            </tbody>
            <br />
            <br />
          </table>
        </div>
        <div style={{ marginLeft: "80%" }}>
          <button
            className="btn btn-primary"
            onClick={this.jsPdfGenerator}
            style={{ width: "170px", height: "40px", fontSize: "15px" }}
          >
            Generate Report PDF
          </button>
        </div>
        <div class="center">
          <div class="pagination">
            <a href="#">&laquo;</a>

            <a href="#" class="active">
              1
            </a>
            <a href="#">2</a>
            <a href="#">&raquo;</a>
          </div>
        </div>
      </div>
    );
  }
}
export default MeetAtMallHome;
