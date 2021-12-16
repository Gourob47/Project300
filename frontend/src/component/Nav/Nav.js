import React, { Fragment } from "react";

import { Link } from "react-router-dom";

import "./Nav.css";
import logo from "../../images/logo.png";

import "../../../node_modules/bootstrap/dist/css/bootstrap.min.css";
import ServiceDetails from "../Service/ServiceDetails";


const Nav = () => {
  return (

    
    <Fragment>

      
      <div className="container">
        <ul className="head">
       
           
            
            <Link to=""   > < img className="img"  src={logo} alt="" /></Link>
            <Link to="" className="name">Unlocked_Creations</Link> 
           
           
        </ul>

        <ul className="header">

     
       
          <li>
            <Link to="/contact">CONTACT</Link>
          </li>
          <li>
            <Link to="/about">ABOUT</Link>
          </li>
          <li>
            <Link to="/services">SERVICES</Link>
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
