import React, { Fragment } from "react";

import { Link } from "react-router-dom";

import "./Nav.css";

const Nav = () => {
  return (
    <Fragment>
      <div>
        <div className="Head">
          <h1>U_Creations</h1>
          <hr className="line" />
        </div>

        <ul className="header">
          <li>
            <Link to="/contact">CONTACT</Link>
          </li>
          <li>
            <Link to="/about">ABOUT</Link>
          </li>
          <li>
            <Link to="/service">SERVICES</Link>
          </li>
          <li>
            <Link to="/home">HOME</Link>
          </li>
        </ul>
      </div>
    </Fragment>
  );
};

export default Nav;
