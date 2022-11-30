import React from "react";
import { NavLink } from "react-router-dom";
import {FormUrl} from "../hooks/Env";


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

  return (
    //  Top Navigation Menu
    <div className="topnav">
      <div className="head">
        <NavLink to="/scangift" style={{ padding: '0' }} >
        <p> <span style={{ color: "red" }} >Scan</span><span style={{ color: "#004AAD" }} >Gift</span> </p>
        </NavLink>
      </div>
      {/* <!-- Navigation links (hidden by default) --> */}
      <div id="myLinks">
        <a href={FormUrl} target="_blank" rel="noreferrer">Campagne</a>
        <a href="https://wa.me/22968403520" target="_blank" rel="noreferrer">Contacts</a>
        <a href="https://instagram.com/scan.gift" target="_blank" rel="noreferrer">À Propos</a>
      </div>
      {/* <!-- "Hamburger menu" / "Bar icon" to toggle the navigation links --> */}
      <NavLink to="#" className="icon" onClick={myFunction}>
        {/* <a href="#" class="icon" onClick={myFunction}> */}
        <i className="fa fa-bars"></i>
      </NavLink>
    </div>
  );
};

export default Sidebar;
