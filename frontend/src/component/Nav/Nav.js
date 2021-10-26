import React, { Fragment } from "react";


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
            <a href="#about">ABOUT</a>
          </li>
          <li>
            <a href="#contact">CONTACT</a>
          </li>
          <li>
            <a href="#services">SERVICES</a>
          </li>
          <li>
            <a className="home">HOME</a>
          </li>
        </ul>
      </div>

   
    </Fragment>
  );
};

export default Nav;
