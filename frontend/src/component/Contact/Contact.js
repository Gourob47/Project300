import { Avatar } from "@mui/material";
import { margin } from "@mui/system";
import { Fragment } from "react";
import { Link } from "react-router-dom";

import ContactIcon from "../../../node_modules/@mui/icons-material/ContactSupport";
import YoutubeIcon from "../../../node_modules/@mui/icons-material/YouTube";
import FacebookIcon from "../../../node_modules/@mui/icons-material/Facebook";
import InstragramIcon from "../../../node_modules/@mui/icons-material/Instagram";
import LinkedInIcon from "../../../node_modules/@mui/icons-material/LinkedIn";

import "./Contact.css";

const Contact = () => {
  return (
    <Fragment>
      <div id="get">
        <div className="dark-overlay">
          <h1>Unlocked_ Creation</h1>
          <p>Creation is Ours.....Choice is yours</p>
        </div>
      </div>
      <div className="heading">
        <h1>Contact Us</h1>
      </div>

      <div className="con-1">
       <div className="con-3">
       <div className="con-2">
          <div>
            <img
              src="https://images.pexels.com/photos/130850/pexels-photo-130850.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500"
              alt=""
            />

            <h4>Contact Support</h4>

            <p>If need any quiry Please free to contact us</p>
          </div>
        </div>
       </div>

      
      <div className="con-3">
      <div className="con-2">
          <div>
            <img
              src="https://images.pexels.com/photos/7541997/pexels-photo-7541997.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500"
              alt=""
            />

            <h4>Technical Support</h4>
            <p>Get in touch with our Technical Support</p>
          </div>
        </div>
      </div>

       <div className="con-3">

       <div className="con-2">
          <div>
            <img
              src="https://images.pexels.com/photos/2333332/pexels-photo-2333332.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940"
              alt=""
            />

            <h4>Article & guides</h4>
            <p>100+ Article to get the information</p>
          </div>
        </div>

       </div>

      </div>


      {/*<div className="contactSection">

        <div></div>
        <div className="contactSectionGradient"></div>

        <div className="contactSectionContainer">
          <Avatar
          style={{width:"10vmax", height:"10vmax", margin:"2vmax 0"}}
          src="https://res-console.cloudinary.com/dxbur4rck/thumbnails/v1/image/upload/v1641303986/c2VydmljZXMvbG9nb192a202aWc=/preview"
          />

          <h2>Unlocked_Creations</h2>
          <p>User Satisfaction is Our Main Goal</p>
          
        </div>

        <div className="contactSectionContainer2">
          <h2>Our Brand Partner</h2>
         
         <a href=""><YoutubeIcon/></a>
         <a href=""><FacebookIcon/></a>
         <a href=""><InstragramIcon/></a>
         <a href=""><YoutubeIcon/></a>
         <a href=""><LinkedInIcon/></a>

        </div>

  </div>*/}
    </Fragment>
  );
};

export default Contact;
