import React, { useState } from "react";
import useCookie from "../../hooks/Cookie";
import client from "../../hooks/Data";

var AnncsCmp = (function () {
  // const [annonce, setAnnonce] = useState({});

  /**
   * Recherche et retourne un annonce de manière aléatoire
   * @param {Boolean} n - forcer la recherche d'une nouvelle annonce
   * @returns {*} annonce
   */
  var getRandomAnncs = (n = false) => {
    // (async function () {
    if (
      !useCookie.ifCookie("annonce") ||
      useCookie.getCookie("annonce") == "" ||
      n
    ) {
      client
        .get("select/aleatoire/annonce")
        .then((res) => {
          const data = res.data.data;

          // setAnnonce(JSON.parse(JSON.stringify(data)));
          // console.log("ann :" + JSON.stringify(data));

          return JSON.parse(JSON.stringify(data));
          //useCookie.setCookie("annonce", JSON.stringify(data));
        })
        .catch((err) => {
          console.error(err);
          return err;
        });
    } else {
      const y = getPubAnncs()
      return y
    }
      // })()
  };

  /**
   * Rechercher une annonce en fonction de l'événement
   * @param {Number} eventId
   * @param {Boolean} n
   * @returns {*} annonce
   */
  var getEventAnncs = (eventId, n = false) => {
    // (async function () {
    if (
      !useCookie.ifCookie("annonce") ||
      useCookie.getCookie("annonce") == "" ||
      n
    ) {
      client
        .get("/select/aleatoire/annonce/" + eventId)
        .then((res) => {
          const data = res.data.data;

          // setAnnonce(JSON.parse(JSON.stringify(data)));
          // console.log("ann :" + JSON.stringify(data));

          return JSON.parse(JSON.stringify(data));
          //useCookie.setCookie("annonce", JSON.stringify(data));
        })
        .catch((err) => {
          console.error(err);
        });
    } else {
      const data = useCookie.getCookie("annonce");
      const y = JSON.parse(data);
      // setAnnonce(y);
      console.log("from cookie :");

      return y;
    }
    //   })()
  };

  /**
   * Fonction d'ajout d'une annonce
   * @param {*} annonce
   * @returns
   */
  var addAnncs = async (annonce) => {
    await client.post("/annonce", annonce)
      .then((res) => {
        //console.log(res)
        return res.data.succes;
      })
      .catch((err) => {
        console.error(err);
        alert(
          "Echec de l'ajout ! Veuillez vérifier tout les champs et réessayer !"
        );
        return err.data.succes;
      });
  };


  /**
   * Recherche et récupère uniquement les annonces publicitaire
   * @returns {*} annonce
   */
  function getPubAnncs() {
    client
      .get("/select/pub/annonce")
      .then((res) => {
        const data = res.data.data;

        // setAnnonce(JSON.parse(JSON.stringify(data)));
        // console.log("ann :" + JSON.stringify(data));

        return JSON.parse(JSON.stringify(data));
        //useCookie.setCookie("annonce", JSON.stringify(data));
      })
      .catch((err) => {
        console.error(err);
        return err;
      });
  }


  /**
   * Supprimer une annonce à partir de son Id
   * @param {Number} anncsId 
   * @returns {Boolean} boolean - true si c'est bien effacé et false si problème
   */
  function deleteAnncs(anncsId) {}

  return {
    getRandomAnncs,
    getEventAnncs,
    getPubAnncs,
    addAnncs,
    deleteAnncs,
  };
})();

export default AnncsCmp;
