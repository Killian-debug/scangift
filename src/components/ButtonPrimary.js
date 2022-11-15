import React from 'react';
import { NavLink } from "react-router-dom";



/**
 * 
 * @param {String} text - texte du bouton
 * @param {String} toUrl - url de destination 
 * @param {function} action - fonction à exécuter avant d'ouvrir l'url
 * @returns 
 */
const ButtonPrimary = ({text, toUrl, action}) => {
    return (
        <div className="btn-principal mx-auto text-center" onClick={action}>
                <NavLink to={toUrl} >
                    <button className="button-79">{text}</button>
                </NavLink>
        </div>
    );

    
};

export default ButtonPrimary;