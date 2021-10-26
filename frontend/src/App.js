
import './App.css';

import Header from "./component/layout/Header/Header.js";


import {BrowserRouter as Router, Route} from"react-router-dom";

import webfont from "webfontloader";
import React from 'react';

import Footer from "./component/layout/Footer/Footer.js"

import Nav from "./component/Nav/Nav.js";
import Navbar from "./component/Navbar/Navbar.js";










function App() {

  React.useEffect(()=>{

    webfont.load({
      google:{
        families:["Roborto","Droid sans","chilanka"],
      },
    });
  
  },[]);

  return (

    <Router>
    <Header />
    <Route exact path="/" component={Nav} />
    <Navbar/>

    <Footer />


    </Router>

   
 
  );
}

export default App;
