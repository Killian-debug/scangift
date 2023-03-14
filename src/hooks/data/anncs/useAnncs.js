import { useEffect, useState } from "react";
import client from "../../Axios";


/**
 * Recherche et retourne un annonce de manière aléatoire en fonction de l'event
 * @param {String} codeEvent - Code de l'évenement/qrcode des annonces à selectionner. 'default' pour les annonces par défaut
 * @returns {annonce} - annonce
 */
export const useAnncs = ( { codeEvent = 'default', id = null } ) => {
 
  const [annonce, setAnnonce] = useState(null);
  const [path, setPath] = useState(id == null ? `/select/aleatoire/annonce/${codeEvent}` : `/select/annonce/${id}`);

  // useEffect(() => {
  //   if (id) {
  //     setPath(`/select/annonce/${id}`)
  //   } 
  //   else {
  //     setPath(`/select/aleatoire/annonce/${codeEvent}`)
  //   }
  // }, [path]);

  useEffect(() => {
      async () =>  {
        await client
          .get(path)
          .then((res) => {
            const data = res.data.data;
  
            console.log("ann :" + JSON.stringify(data));
            setAnnonce(JSON.parse(JSON.stringify(data)));
          })
          .catch((err) => {
            console.error(err);
            setAnnonce(null)
          });
        }
  }, []);

  return annonce
};
