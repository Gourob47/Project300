import "./App.css";

import Header from "./component/layout/Header/Header.js";

import { BrowserRouter as Router, Route, Link, Switch } from "react-router-dom";

import webfont from "webfontloader";
import React from "react";

import Footer from "./component/layout/Footer/Footer.js";

import Nav from "./component/Nav/Nav.js";
import Navbar from "./component/Navbar/Navbar.js";

import Service from "./component/Service/Service.js";
import About from "./component/About/About.js";
import Home from "./component/Home/home.js";
import Contact from "./component/Contact/Contact.js";

import MetaData from "./component/layout/MetaData";
import Loader from "./component/layout/Loader/Loader";

import ServiceDetails from "./component/Service/ServiceDetails";

import Search from "./component/Service/Search.js"

import LoginSignup from "./component/User/LoginSignup";

import {Profile} from "./component/User/Profile";

import UpdateProfile from "./component/User/UpdateProfile.js";

import store from "./Store";
import { loadUser } from "./actions/userAction";

import ProtectedRoute from "./component/Route/ProtectedRoute";

import UserOptions from "./component/layout/Header/UserOptions.js";
import { useSelector } from "react-redux";




//import { getServiceDetails } from "./actions/serviceAction";

function App() {


  const {isAuthenticated, user}= useSelector((state)=>state.user);

  React.useEffect(() => {
    webfont.load({
      google: {
        families: ["Roborto", "Droid sans", "chilanka"],
      },
    });

    store.dispatch(loadUser());
  }, []);

  return (
    <Router>
      <MetaData title="Unlocked_Creations" />

      {/*<Header/>
    <Route exact path="/" component={Nav} />
    <Nav/>
    
    <Route exact path="/service/:id" component={serviceDetails}/>
    <Navbar/>*/}
      <Header />
      <Nav />
      {isAuthenticated && <UserOptions user={user}/>}
     

      <Route exact path="/" component={Home} />
      <Route exact path="/" component={Navbar} />

     
      <Route exact path="/home" component={Home} />

      <Route exact path="/home" component={Navbar}/>
      

     
      <Route exact path="/service/:id" component={ServiceDetails} />

      <Route exact path="/search" component={Search}/>
      
      
    
     
      <Route exact path="/services" component={Service} />
    
      
      <Route exact path="/services/:keyword" component={Service}/>

      <Route exact path="/login" component={LoginSignup} />

      <ProtectedRoute exact path="/account" component={Profile}/>

      <ProtectedRoute exact path="/me/update" component={UpdateProfile}/>

     
     
      <Route exact path="/about" component={About} />
      <Route exact path="/contact" component={Contact} />

      <Footer />
    </Router>
  );
}

export default App;
