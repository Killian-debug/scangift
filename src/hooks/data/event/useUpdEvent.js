import { useState, useEffect } from "react";
import client from "../../Axios";


 /**
   * Fonction de mise à jour d'un event
   * @param {*} event - l'event à ajouter
   * @returns {Boolean} - true si c'est ajouté
   */
 export const useUpdAnncrs = ({codeEvent, event}) => {
  const [response, setResponse] = useState(null);

  useEffect(() => {
    async () =>
    await client.patch(`/event/${codeEvent}`, event)
      .then((res) => {

        console.log(res.data)
        setResponse(res.data.succes);
      })
      .catch((err) => {

        console.error(err);
        alert(
          "Echec de mise à jour!"
        );

      });
  }, [codeEvent]);

  return response
 
  };