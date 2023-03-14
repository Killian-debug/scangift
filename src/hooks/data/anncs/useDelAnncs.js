import { useState, useEffect } from "react";
import client from "../../Axios"

  /**
   * Supprimer une annonce à partir de son Id
   * @param {Number} anncsId 
   * @returns {Boolean} boolean - true si c'est bien effacé et false si problème
   */
  export const useDelAnncs = ({anncsId}) => {
    const [response, setResponse] = useState(null);


    useEffect(() => {
    async () => {
        await client
        .delete(`/annonce/${anncsId}`)
        .then( res => 
            {
                setResponse(res.data.success);
            })
        .catch( (err) => 
            {
                console.error(err)
            });
    }

  })
}
