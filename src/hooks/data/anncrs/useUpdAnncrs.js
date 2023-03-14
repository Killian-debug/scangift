import { useState, useEffect } from "react";
import client from "../../Axios";


 /**
   * Fonction de mise à jour d'un annonceur
   * @param {*} annonceur - l'annonceur à ajouter
   * @returns {Boolean} - true si c'est modifié
   */
 export const useUpdAnncrs = ({id, annonce}) => {
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
        alert(
          "Echec de mise à jour ! Veuillez vérifier tout les champs et réessayer !"
        );

      });
  }, []);

  return response;
  
  };