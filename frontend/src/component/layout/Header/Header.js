import React from 'react';
import {ReactNavbar} from "overlay-navbar";
import logo from "../../../images/logo.png";




const Header = () => {
    return <ReactNavbar 
    burgerColor="#19181A"
    //burgerColorHover="#ad2d24"
    logo={logo}

    logowidth="20vmax"
    navColor1="#00A4CCFF"
    logoHoverSize="10px"
    logoHoverColor="white"
  


    link1Text="Home"
    link2Text="Services"
    link3Text="Contact"
    link4Text="About"
    lingk1Url="/"
    lingk2Url="/Services"
    lingk3Url="/Contact"
    lingk4Url="/About us"
    link1Size="1.2vmax"

    nav1JustiifyContent="flex-end"
    nav2JustiifyContent="flex-end"
    nav3JustiifyContent="flex-start"
    nav4JustiifyContent="flex-start"

    link1ColorHover="white"
    link2ColorHover="white"
    link3ColorHover="white"
    link4ColorHover="white"

    link2Margin="1.3vmax"
  
  
    profileIconColor= "rgba(35,35,35,0.8)"
    searchIconColor= "rgba(35,35,35,0.8)"
    cartIconColor= "rgba(35,35,35,0.8)"
    

    profileIconColorHover="#eb4034"
    searchIconColorHover="#eb4034"
    cartIconColorHover="#eb4034"
    cartIconMargin="1vmax"

    

    
    />;
    
}

export default Header;
