import { useState, useEffect } from "react";
import client from "../../Axios"

  /**
   * Supprimer un event à partir de son Id
   * @param {Number} eventId 
   * @returns {Boolean | null} boolean | null - true si c'est bien effacé et false si problème
   */
  export const useDelEvent = ({eventId}) => {
    const [response, setResponse] = useState(null);

    useEffect(() => {
        async () => {
            await client
            .post(`/event/${eventId}`)
            .then( res => 
                {
    
                    console.log(res.data)
                    setResponse(res.data.data.sucess)
                } )
            .catch( (err) => 
                {
                   console.error(err)
                }
            );
        }
    }, [eventId]);

    return response;
  }
