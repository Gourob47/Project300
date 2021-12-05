
import './App.css';

import Header from "./component/layout/Header/Header.js";


import {BrowserRouter as Router, Route, Link} from"react-router-dom";

import webfont from "webfontloader";
import React from 'react';

import Footer from "./component/layout/Footer/Footer.js"

import Nav from "./component/Nav/Nav.js";
import Navbar from "./component/Navbar/Navbar.js";



import Service from "./component/Service/Service.js";
import About from "./component/About/About.js";
import Home from "./component/Home/home.js";
import Contact from "./component/Contact/Contact.js";


import MetaData from "./component/layout/MetaData";


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

<MetaData title="Unlocked_Creations"/>
    
    {/*<Header/>
    <Route exact path="/" component={Nav} />
    <Nav/>
    

    <Navbar/>*/}
    <Header/>
    <Nav/>
    <Route exact path="/" component={Home}/>
    <Route exact path="/home" component={Home}/>
    <Route exact path="/service" component={Service}/>
    <Route exact path="/about" component={About}/>
    <Route exact path="/contact" component={Contact}/>
    

    <Footer />


    </Router>

   
 
  );
}

export default App;
