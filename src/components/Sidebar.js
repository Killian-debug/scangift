import React, {useState, useEffect} from "react";
import { NavLink, useLocation, useParams } from "react-router-dom";
import {FormUrl} from "../hooks/Env";
import ArrowLeft from "../components/ArrowLeft";
import src from "../assets/img/logo192.png";

const Sidebar = () => {
  
  
  /* Toggle between showing and hiding the navigation menu links when the user clicks on the hamburger menu / bar icon */
  function myFunction() {
    var x = document.getElementById("myLinks");
    if (x.style.display === "block") {
      x.style.display = "none";
    } else {
      x.style.display = "block";
    }
  }


  var pathna = useLocation().pathname


  const NavActions = ({path}) => {

    if (path === '/' ) {
      return (
        <a className="icon py-2 px-2 " href="https://wa.me/22940538164"
           
        target="_blank"
        rel="noreferrer">
          <button
            
            className="btn top-btn rounded"
          >
             Contacts
          </button>
        </a>
      ); 
    } else {
       
     return <NavLink to="/scanpage" className="icon py-2 px-2" >
     <button type="button" className="btn top-btn rounded">Contacts</button>
 {/* <i className="fa fa-bars"></i> */}
   </NavLink>
    } 
  };
  

  return (
    //  Top Navigation Menu
    <div className="topnav">
      <div className="head">
      
         {/*<p >
            <span style={{ color: "#004AAD" }} > </span><span style={{ color: "#004AAD" }} >ScanGift</span> */}
          {/* </p> */}  
          
          <NavLink to="/" >

          <img src={src} alt="logo scangift" width="40px" className="img-fluid rounded" />
          </NavLink>
       
      </div>
      {/* <!-- Navigation links (hidden by default) --> */}
      <div id="myLinks" className="p-3 text-right">
        {/* <a href={FormUrl} target="_blank" rel="noreferrer">Campagne</a> */}
        <a href="https://wa.me/+22940538164" target="_blank" rel="noopener noreferrer"> <i className="fa fa-whatsapp font-weight-bold  text-dark"> :</i> whatsapp</a> 
        <a href="https://instagram.com/scan.gift" target="_blank" rel="noopener noreferrer"> <i className="fa fa-instagram font-weight-bold text-dark" aria-hidden="true"> :</i> @scan.gift</a>

      </div>
      {/* <!-- "Hamburger menu" / "Bar icon" to toggle the navigation links --> */}
      
      {/* <NavActions path={pathna} />
       */}
        <a className="icon py-2 px-2 " type="button"
           
           target="_blank"
           rel="noreferrer">
       <button
            onClick={myFunction}
            className="btn top-btn rounded"
          >
             Contacts
          </button>
      </a>
    </div>
  );
};

export default Sidebar;
