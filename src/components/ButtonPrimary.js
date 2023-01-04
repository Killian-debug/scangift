import React from 'react';

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
                <a href={ toUrl } target="_blank" rel='noreferrer' >
                    <button className="button-79 rounded">{text}</button>
                </a>
        </div>
    );

    
};

export default ButtonPrimary;