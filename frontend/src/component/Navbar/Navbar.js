import { Fragment } from "react";

import "./Navbar.css";

import Pr from "../Home/Pr";

const pr = {
  name: "CONCERT",
  image: [
    {
      url: "https://images.pexels.com/photos/1105666/pexels-photo-1105666.jpeg?cs=srgb&dl=pexels-vishnu-r-nair-1105666.jpg&fm=jpg",
    },
  ],
  price: "$500",
  _id: "Gourob",
};

const Navbar = () => {
  return (
    <Fragment>
      <div className="banner">

         <div className="banner1">
         <h1>WelCome to Unlocked_Creations</h1>
         <h2>Please Visit and enjoy your desired package</h2>
         </div>
         <div className="banner2">

         </div>

   
      </div>

      <div className="head my-2">
        <h4>Featured On</h4>
        <hr className="line2" />
      </div>

      <div className="Featers">
        <div className="container2">
          <Pr pr={pr} />
          <Pr pr={pr} />
          <Pr pr={pr} />
          <Pr pr={pr} />
          <Pr pr={pr} />
          <Pr pr={pr} />
          <Pr pr={pr} />
          <Pr pr={pr} />
          <Pr pr={pr} />
          <Pr pr={pr} />
        </div>
      </div>
    </Fragment>
  );
};

export default Navbar;
