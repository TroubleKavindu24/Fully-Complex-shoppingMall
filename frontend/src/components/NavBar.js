import React, { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import NavBar2 from "./NavBar2";
import { UserContext } from "../App";

const NavBar = () => {
  const { state, dispatch } = useContext(UserContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.clear();
    dispatch({ type: "CLEAR" });
    navigate("/");
  };

  return (
    <div>
      <div className="row">
        <div className="col-9" style={{ letterSpacing: "12px" }}>
          <marquee direction="left">Innovative Trade Plaza Mall</marquee>
        </div>
        <div className="col-3">Need Help? Call Us: (+94) 11111111</div>
        <hr />
      </div>

      <NavBar2 />

      <nav
        className="navbar navbar-expand-lg navbar-light"
        style={{ backgroundColor: "#d9dbde" }}
      >
        <Link className="navbar-brand" to="/">
          Home
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbarText"
          aria-controls="navbarText"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarText">
          <ul className="navbar-nav mr-auto">
            <li className="nav-item">
              <Link className="nav-link" to="/permenentshop_home">
                Stores
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/grid">
                Book a stall
              </Link>
            </li>
            <li className="nav-item dropdown">
              <Link
                className="nav-link dropdown-toggle"
                to="#"
                data-toggle="dropdown"
                aria-haspopup="true"
                aria-expanded="false"
              >
                Categories
              </Link>
              <div className="dropdown-menu">
                <Link className="dropdown-item" to="/shop">
                  Foods
                </Link>
                <Link className="dropdown-item" to="/shop">
                  Stationery
                </Link>
                <Link className="dropdown-item" to="/shop">
                  Clothes
                </Link>
                <Link className="dropdown-item" to="/shop">
                  Electronics
                </Link>
              </div>
            </li>
          </ul>
          <ul className="navbar-nav">
            {state ? (
              <>
                <li className="nav-item">
                  <Link className="nav-link" to="/profile">
                    My Profile
                  </Link>
                </li>
                <li className="nav-item">
                  <i
                    className="material-icons"
                    style={{ color: "white" }}
                    onClick={handleLogout}
                  >
                    power_settings_new
                  </i>
                </li>
              </>
            ) : (
              <>
                <li className="nav-item">
                  <Link className="nav-link" to="/signin">
                    Login
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/signup">
                    Signup
                  </Link>
                </li>
              </>
            )}
          </ul>
        </div>
      </nav>
    </div>
  );
};

export default NavBar;
