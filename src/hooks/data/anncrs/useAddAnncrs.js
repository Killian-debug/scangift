import { useState, useEffect } from "react";
import client from "../../Axios";


 /**
   * Fonction d'ajout d'une annonceur
   * @param {*} annonceur - l'annonceur à ajouter
   * @returns {Boolean} - true si c'est ajouté
   */
 export const useAddAnncrs = ({annonceur}) => {
  const [response, setResponse] = useState(null);

  useEffect(() => {
    async () =>
    await client.post("/annonceur", annonceur)
      .then((res) => {

        console.log(res.data)
        setResponse(res.data.succes)
      })
      .catch((err) => {

        console.error(err);
        alert(
          "Echec de l'ajout ! Veuillez vérifier tout les champs et réessayer !"
        );
       
      });
  }, []);
  
  return response
  };