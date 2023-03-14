import { useState, useEffect } from "react";
import client from "../../Axios";


 /**
   * Fonction d'ajout d'une annonce
   * @param {*} annonce - l'annonce à ajouter
   * @returns {Boolean} - true si c'est ajouté
   */
 export const useAddAnncs = ({annonce}) => {
  const [response, setResponse] = useState(null);

  useEffect(() => {
  async () =>
    await client.post("/annonce", annonce)
      .then((res) => {

        console.log(res.data)
        setResponse(res.data.succes);
      })
      .catch((err) => {
        console.error(err);
      });
  })

  return response; 
}