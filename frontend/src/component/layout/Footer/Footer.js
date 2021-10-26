//import "../../../../node_modules/bootstrap/dist/css/bootstrap.min.css";

import React from "react";

import "./Footer.css";



import { FaFacebook, FaInstagram, FaTwitter } from "react-icons/fa";

const Footer = () => {
    return (
      <footer class="footer">

          <div class="container">

              <div class="row">

              <div class="footer-col">
                 
                  <ul>
                      <h4  >How We Works</h4>
                      <li><a href="#">Platform Overview</a></li>
                      <li><a href="#">Event Orchestration</a></li>
                      <li><a href="#">Event Marketing</a></li>
                      <li><a href="#">Sponsor Management</a></li>
                      <li><a href="#">Content Management</a></li>
                      <li><a href="#">Networking</a></li>
                      <li><a href="#">Onsite Solution</a></li>
                      <li><a href="#">Engagement</a></li>


                  </ul>
              </div>

              <div class="footer-col">
            
                  <ul>
                      <h4>Who We help</h4>
                      <li><a href="#">Conferences</a></li>
                      <li><a href="#">Internal Events</a></li>
                      <li><a href="#">Webinars</a></li>
                      <li><a href="#">Corporation</a></li>
                      <li><a href="#">Agencies</a></li>
                      <li><a href="#">FieldMarketing</a></li>
                      <li><a href="#">Non-Profits</a></li>
                      <li><a href="#">Associations</a></li>
                  </ul>
              </div>

              <div class="footer-col">
                 
                  <ul>
                      <h4>About US</h4>
                      <li><a href="#">Our Team</a></li>
                      <li><a href="#">Careers</a></li>
                      <li><a href="#">Press</a></li>
                      <li><a href="#">Referral Program</a></li>
                      <li><a href="#">Partner Program</a></li>
                      <li><a href="#">Contact Us</a></li>

                  </ul>
              </div>


              <div class="footer-col">
                
             
                 <div class="social">
                     <ul>
                     <h4>Follow us</h4>
                       <a href="#"><i><FaFacebook/></i></a>
                     <a href="#"><i><FaTwitter/></i></a>
                     <a href="#"><i><FaInstagram/></i></a>
                     </ul>
                   

                 </div>
              </div>

              </div>
             
          </div>

      </footer>
    )
}

export default Footer;
