import { useState, useEffect } from "react";
import client from "../../Axios"

  /**
   * Supprimer un annonceur à partir de son Id
   * @param {Number} anncrsId 
   * @returns {Boolean | null} boolean | null - true si c'est bien effacé et false si problème
   */
  export const useDelAnncrs = ({anncrsId}) => {
    const [response, setResponse] = useState(null);

    useEffect(() => {
       
    async () => {
        await client
        .delete(`/annonceur/${anncrsId}`)
        .then(res => 
            {
                setResponse(res.data.sucess);
            })
        .catch((err) => 
            {
                console.log(err)
            }
        );
    }
    }, [anncrsId]);

    return response
  }
