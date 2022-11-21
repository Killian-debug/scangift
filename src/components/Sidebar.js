import React from "react";
import { NavLink } from "react-router-dom";

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
    <div class="topnav">
      <div className="head">
        <p style={{ color: "black" }}>Logo</p>
      </div>
      {/* <!-- Navigation links (hidden by default) --> */}
      <div id="myLinks">
        <NavLink>News</NavLink>
        <NavLink>Contacts</NavLink>
        <NavLink>About</NavLink>
      </div>
      {/* <!-- "Hamburger menu" / "Bar icon" to toggle the navigation links --> */}
      <NavLink to="#" className="icon" onClick={myFunction}>
        {/* <a href="#" class="icon" onClick={myFunction}> */}
        <i class="fa fa-bars"></i>
      </NavLink>
    </div>
  );
};

export default Sidebar;
