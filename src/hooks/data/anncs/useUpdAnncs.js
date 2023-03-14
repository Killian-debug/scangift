import { useState, useEffect } from "react";
import client from "../../Axios";


 /**
   * Fonction d'ajout d'une annonce
   * @param {*} annonce - l'annonce à ajouter
   * @returns {Boolean} - true si c'est ajouté
   */
 export const useUpdAnncs = ({id, annonce}) => {

  const [response, setResponse] = useState(null);

  useEffect(() => {
    async () =>
    await client.patch(`/annonce/${id}`, annonce)
      .then((res) => {

        console.log(res.data)
        setResponse(res.data.succes);
      })
      .catch((err) => {
        console.error(err);
       
      });
  }, [id]);
  
  return response
  
  };