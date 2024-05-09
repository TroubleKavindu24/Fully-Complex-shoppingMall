import React, { Component } from "react";
import axios from "axios";
import swal from "sweetalert";
import insert from "../../images/brands.gif";
import "./myStyles.css";
import StripeCheckout from "react-stripe-checkout";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default class CreateOrders extends Component {
  onToken = (token) => {
    console.log(token);
    toast.success("Payment Successful!");
  };

  constructor(props) {
    super(props);
    this.state = {
      name: "",
      contactNo: "",
      orderDate: "",
      status: "Pending",
    };
  }
  componentDidMount() {
    const cartData = JSON.parse(localStorage.getItem("cartData"));
    const cartTotal = this.calculateCartTotal(cartData.items);
    console.log(cartTotal);
    console.log(cartData.items);
    this.setState({
      cartTotal: cartTotal,
    });
  }

  calculateCartTotal(items) {
    let total = 0;
    items.forEach((item) => {
      total += parseFloat(item.itemPrice) * item.quantity;
    });
    return total.toFixed(2);
  }

  handleInputChange = (e) => {
    const { name, value } = e.target;

    this.setState({
      ...this.state,
      [name]: value,
    });
  };

  //save to db
  onSubmit = (e) => {
    e.preventDefault(); // Prevent default form submission

    const { name, contactNo, orderDate, status, cartTotal } = this.state;

    const data = {
      name: name,
      contactNo: contactNo,
      orderDate: orderDate,
      status: status,
      cartTotal: cartTotal,
    };
    //window.location='/payhome'
    // console.log(data)

    //validation

    const re = /^[0-9\b]+$/;
    if (name == "" || contactNo == "" || orderDate == "") {
      swal(
        "Please fill the form correctly",
        "Form values cannot be empty",
        "error"
      );
    } else if (name.length < 2) {
      swal("User name invalid", "length should be greater than 2", "error");
    } else if (!re.test(String(contactNo)) || contactNo.length != 10) {
      swal(
        "Contact Number invalid",
        "contact number should be valid pattern",
        "error"
      );
    } else {
      swal({
        title: "Are you sure?",
        text: `Name: ${this.state.name} | Contact No: ${this.state.contactNo} | Status: ${this.state.status} | Total: ${this.state.cartTotal}`,
        icon: "info",
        buttons: true,
        dangerMode: true,
      }).then((willDelete) => {
        if (willDelete) {
          axios.post("http://localhost:8070/order/save", data).then((res) => {
            if (res.data.success) {
              localStorage.removeItem("react-use-cart");
              this.setState({
                name: "",
                contactNo: "",
                orderDate: "",
                price: "",
                status: "Pending",
              });
            }
          });
          swal({
            title: "Order has been placed Successfully!",
            text: "Thank you for choosing Us",
            icon: "success",
          });
        } else {
          swal("Your Order is not completed!");
        }
      });
    }
  };

  demo = () => {
    //setState
    this.setState({
      name: "Chanduni Nethmini",
    });
    this.setState({
      contactNo: "0710000000",
    });
  };

  render() {
   
    const today = new Date();
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);

   
    const minDate = tomorrow.toISOString().split("T")[0];
    return (
      <div>
        <div class="row">
          <div class="col-6">
            <img
              src={insert}
              className="rounded-circle"
              style={{ width: "70%", height: "70%", marginLeft: "30%" }}
            />

            <section id="hire">
              <div className="">
                <div class="container-fluid">
                  <div class="Jumbotron jumbotron-fluid">
                    <div className="container hire">
                      <br />
                      <marquee direction="left">
                        <p class="display-3 ">Thanks for choosing E-SHOP</p>
                      </marquee>
                    </div>
                  </div>
                </div>
              </div>
            </section>
          </div>

          <div class="col-6">
            <div style={{}}>
              <div className="" style={{ marginTop: "%" }}>
                <div className="card card1" style={{ width: "80%" }}>
                  <div className="col-md-8 mt-4 mx-auto">
                    <form
                      className="needs-validation"
                      align="center"
                      style={{ width: "110%" }}
                    >
                      <div
                        className="form-group"
                        style={{ marginBottom: "15px" }}
                      >
                        <label
                          style={{ marginBottom: "5px" }}
                          className="topic"
                        >
                          <b>Customer Name: </b>
                        </label>
                        <input
                          type="text"
                          id="validationTooltip01"
                          className="form-control"
                          name="name"
                          placeholder="Enter Your Name"
                          value={this.state.name}
                          onChange={this.handleInputChange}
                          required
                        />
                      </div>

                      {/* <label style={{ marginBottom: "5px" }} className="topic">
                        <b>Address: </b>
                      </label>
                      <div class="row">
                        <div class="col">
                          <input
                            type="number"
                            className="form-control"
                            name="postalNo"
                            placeholder="postal no"
                            value={this.state.postalNo}
                            onChange={this.handleInputChange}
                            required
                          />
                        </div>

                        <div class="col">
                          <input
                            type="text"
                            className="form-control"
                            name="street"
                            placeholder="street"
                            value={this.state.street}
                            onChange={this.handleInputChange}
                          />
                        </div>

                        <div class="col">
                          <input
                            type="text"
                            className="form-control"
                            name="town"
                            placeholder="town"
                            value={this.state.town}
                            onChange={this.handleInputChange}
                          />
                        </div>
                      </div> */}

                      <div
                        className="form-group"
                        style={{ marginBottom: "15px" }}
                      >
                        <label
                          style={{ marginBottom: "5px" }}
                          className="topic"
                        >
                          <b>Contact Number: </b>
                        </label>
                        <input
                          type="text"
                          className="form-control"
                          name="contactNo"
                          placeholder="Enter Your TeleNo"
                          value={this.state.contactNo}
                          onChange={this.handleInputChange}
                        />
                      </div>

                      <div
                        className="form-group"
                        style={{ marginBottom: "15px" }}
                      >
                        <label
                          style={{ marginBottom: "5px" }}
                          className="topic"
                        >
                          <b>Delivery Date: </b>
                        </label>
                        <input
                          type="date"
                          className="form-control"
                          name="orderDate"
                          placeholder="Date"
                          value={this.state.orderDate}
                          onChange={this.handleInputChange}
                          min={minDate}
                        />
                      </div>

                      <label style={{ marginBottom: "5px" }} className="topic">
                        <b>Order Status: Pending</b>
                      </label>
                      <br />
                      <label style={{ marginBottom: "5px" }} className="topic">
                        <b>Order Total: {this.state.cartTotal}</b>
                      </label>

                      {/* <button
                        type="button"
                        class="btn btn-outline-dark btn-sm textsize2"
                        onClick={this.demo}
                      >
                        {" "}
                        Demo{" "}
                      </button> */}
                      <br />
                      <button
                        className="btn btn-primary textsize"
                        type="submit"
                        style={{
                          marginTop: "15px",
                          width: "200px",
                          height: "40px",
                        }}
                        onClick={this.onSubmit}
                      >
                        <i className="far fa-check-square"></i>
                        &nbsp; Confirm the Details
                      </button>

                      <br />

                      <div>
                        <div>
                          <div className="mt-2">
                            <StripeCheckout
                              token={this.onToken}
                              stripeKey="pk_test_51P7jrFSBwVfyKvSe6zLOs01vRh5f3IDsJt01Jb7QBMsKPKddVWrG6sTWoPyaXNPazrzo681UmZ0odYVBuOcyzTXb00c7AUIj7s"
                              amount={this.state.cartTotal * 100}
                              currency="LKR"
                              name="E-SHOP"
                              description="Order Payment"
                              image={insert}
                              billingAddress={true}
                              shippingAddress={true}
                            >
                              <button className="btn btn-primary textsize">
                                Pay with Card
                              </button>
                            </StripeCheckout>
                          </div>
                          <ToastContainer />
                        </div>

                        <ToastContainer />
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
