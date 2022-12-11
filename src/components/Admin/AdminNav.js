import React from "react";
import { NavLink } from "react-router-dom";

const AdminNav = () => {
  return (
    <nav className="nav justify-content-center">
      <NavLink to="/account/addadvsr" className="nav-link">
        Ajout Annonceur
      </NavLink>
      <NavLink className="nav-link" to="/account/addanncs">
        Ajouter une Annonce
      </NavLink>
    </nav>
  );
};

export default AdminNav;
