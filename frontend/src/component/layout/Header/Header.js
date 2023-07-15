import React from 'react';
//import {ReactNavbar} from "overlay-navbar";
import {ReactNavbar} from "overlay-navbar"
import logo from "../../../images/logo.png";

import {FaUserAlt, FaSearch} from "react-icons/fa";
import {AiOutlineSearch} from "react-icons/ai"




const Header = () => {
   
    return (
    <ReactNavbar 
    burgerColor="#19181A"
    
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
    link2Url="/services"
    link3Url="/Contact"
    link4Url="/about"
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

  
  


  
    

   searchIcon = {true}
   SearchIconElement={FaSearch}
   searchIconMargin = {5}
   searchIconUrl = "/search"
   searchIconSize = "1.5vmax"
   searchIconColor = "white"
   searchIconColorHover = "profileIconColor"
   searchIconTransition = "0.5"




    profileIcon = {true}
    ProfileIconElement={FaUserAlt}
    profileIconMargin = {5}
    profileIconUrl = "/login"
    profileIconSize = "1.5vmax"
    profileIconColor = "white"
    profileIconColorHover = "profileIconColor"
    profileIconTransition = "0.5"


    
   


  
  


    

    

    
    />
    )
    
}

export default Header;
