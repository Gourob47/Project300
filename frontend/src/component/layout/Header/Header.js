import React from 'react';
import {ReactNavbar} from "overlay-navbar";
import logo from "../../../images/logo.png";




const Header = () => {
    return <ReactNavbar 
    burgerColor="#19181A"
    //burgerColorHover="#ad2d24"
    logo={logo}

    logowidth="80px"
    logoHeight="70px"
    navColor1="#5D001E"
    logoHoverSize="10px"
    logoHoverColor="white"
  


    link1Text="Home"
    link2Text="Services"
    link3Text="Contact"
    link4Text="About"
    link1Url="/"
    link2Url="/Services"
    link3Url="/Contact"
    link4Url="/About us"
    link1Size="1.2vmax"

    nav1JustiifyContent="flex-end"
    nav2JustiifyContent="flex-end"
    nav3JustiifyContent="flex-start"
    nav4JustiifyContent="flex-start"

    link1Color="White"

    link1ColorHover="white"
    link2ColorHover="white"
    link3ColorHover="white"
    link4ColorHover="white"

    link3Margin=".7vmax"
    link2Margin="1.3vmax"
  
  
    profileIconColor= "white"
    searchIconColor= "white"
    cartIconColor= "white"
    

    profileIconColorHover="#eb4034"
    searchIconColorHover="#eb4034"
    cartIconColorHover="#eb4034"
    cartIconMargin="1vmax"

    

    
    />;
    
}

export default Header;
