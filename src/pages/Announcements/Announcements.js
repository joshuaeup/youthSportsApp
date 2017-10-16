import React from "react";
import Footer from "../../components/Footer"
import Navbar from "../../components/Navbar";
import SideNav from "../../components/SideNav";
import Messages from "../../components/Messages";
import { Link } from 'react-router-dom';
require("./Announcements.css"); 

const Announcements = props => {


  return (
    <div>
   
    <div className="container-fluid mainContainer">
    <div className="row h-100">
      <SideNav />
      
      <div className="col pt-2 mainBackground">
        <h1 className="customColor text-center customCategory">Announcements</h1>
        <a href="" data-target="#sidebar" data-toggle="collapse" className="hidden-md-up"><i className="fa fa-bars"></i></a>
        <Messages />

      </div>
    </div>
    </div>
    <Footer/>
    </div>


    )
};


export default Announcements;
  