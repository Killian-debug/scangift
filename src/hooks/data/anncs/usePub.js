import { useState, useEffect } from "react";
import client from "../../Axios";

/**
   * Recherche et récupère uniquement les annonces publicitaire
   * @param {String} codeEvent - Code de l'évenement/qrcode des annonces à selectionner. 'default' pour les annonces par défaut
   * @returns {Object} annonce
   */
export const usePub = ({ codeEvent = 'default' }) => {
  const [response, setResponse] = useState(null);

  useEffect(() => {
  async () => client
      .get(`/select/pub/annonce/${codeEvent}` )
      .then((res) => {
        const data = res.data.data;

        console.log("annpub :" + JSON.stringify(data));
        return JSON.parse(JSON.stringify(data));
      })
      .catch((err) => {
        console.error(err);
        return null;
      });

    }, []);
  
    return response
    
  }
