import React, { Component } from "react";
import { Link } from "react-router-dom";
import "./Navbar.css";
import { FaCrow } from "react-icons/fa";

const linkStyle = {
  margin: "1rem",
  textDecoration: "none",
  color: "brown",
};

const Navbar = () => {
  return (
    <nav id="nav">
      <ul>
        <li>
          <FaCrow size={30} style={{ color: "brown" }} />
        </li>
        {/* <li>
          <Link to="/" style={linkStyle}>
            Home
          </Link>
        </li> */}
        <li>
          <Link to="/" style={linkStyle}>
            Home
          </Link>
        </li>
        <li>
          <Link to="/Add" style={linkStyle}>
            Add a product
          </Link>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
