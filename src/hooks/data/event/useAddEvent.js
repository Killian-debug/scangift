import { useState, useEffect } from "react";
import client from "../../Axios";

/**
 * Fonction d'ajout d'un event
 * @param {*} event - l'event à ajouter
 * @returns {Boolean} - true si c'est ajouté
 */
export const useAddEvent = ({ event }) => {
  const [response, setResponse] = useState(null);

  useEffect(() => {
    async () =>
      await client
        .post(`/evenement`, event)
        .then((res) => {
          console.log(res.data);
          setResponse(res.data.succes);
        })
        .catch((err) => {
          console.error(err);
          alert(
            "Echec de l'ajout ! Veuillez vérifier tout les champs et réessayer !"
          );
        });
  }, []);

  return response;
};