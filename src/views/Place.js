import React, { useEffect, useState } from "react";
import client from "../hooks/Axios.js";
import { useParams } from "react-router-dom";
import ClipLoader from "react-spinners/ClipLoader";
import SliderAdd from "../components/SliderAdd";
import ButtonPrimary from "../components/ButtonPrimary";
import useCookie from "../hooks/Cookie";
import { WinnerUrl } from "../hooks/Env";
import SetStat from "../hooks/SetStat.js";

const Place = () => {
  const [annonce, setAnnonce] = useState({});
  const [isWinner, setIsWinner] = useState(false);
  const [ref, setRef] = useState();
  // decrémentation de limite
  const [image, setImage] = useState(true);

  const [loading, setLoading] = useState(false);

  var els = [];
  const [medias, setMedias] = useState();

  const [addEl, setAddEl] = useState();
  //var addEl  // element de l'annonce

  const [destination, setDestination] = useState();


  function setDestUrl() {
    // if (annonce !== {} && annonce != null ) {
    const url = WinnerUrl + ref;
    isWinner ? setDestination(url) : setDestination(annonce.url_des);
    // }
    console.log(destination, ref);
  }

  useEffect(() => {
    setLoading(true);

    if (document.readyState === "complete") {
      setLoading(false);
    }
  }, [loading]);

  window.onload = (event) => {
    setLoading(false);
    console.log("La page est complètement chargée");
    useCookie.setCookie("pauser", true, 20);

  };

  // window.onbeforeunload = (event) => {
  //   const e = event || window.event;
  //   // Cancel the event
  //   e.preventDefault();
  //   if (e) {
  //     e.returnValue = ""; // Legacy method for cross browser support
  //   }
  //   return ""; // Legacy method for cross browser support
  // };

  const onDestClick = () => {
    client.post("gagner", {
      idAnncs: annonce.id_anncs,
      idEvent: annonce.id_event,
      ref: ref,
    });
  
    window.open(destination, "_blank", "noopener noreferrer");
    // window.location.replace(destination)
  };

  const [qrString, setQrString] = useState("select/aleatoire/annonce");


  const [msgToPlace, setMsgToPlace] = useState("");
  let { idevent, giftplace, other } = useParams();

  useEffect(() => {
    
    setTimeout(() => {
      SetStat(idevent, annonce.id_anncs);
    }, 3000 );
    
    if (idevent && idevent !== "") {
      setQrString("/select/aleatoire/annonce/" + 3);
    } else {
      if (
        !useCookie.ifCookie("annonce") ||
        useCookie.getCookie("annonce") == ""
      ) {
        setQrString("/select/aleatoire/annonce");
      } else {
        setQrString("/select/pub/annonce");
      }
    } 
  }, []);

  useEffect(() => {
    (async function () {

      if (
        !useCookie.ifCookie("annonce") ||
        useCookie.getCookie("annonce") == ""
      ) {
        client
          .get(qrString)
          .then((res) => {
            const data = res.data.data;

            setAnnonce(JSON.parse(JSON.stringify(data)));
            console.log("ann :" + JSON.stringify(data));
          })
          .catch((err) => {
            console.error(err);
            return err;
          });
      } else {
        client
          .get(qrString)
          .then((res) => {
            const data = res.data.data;

            setAnnonce(JSON.parse(JSON.stringify(data)));
            console.log("ann :" + JSON.stringify(data));
          })
          .catch((err) => {
            console.error(err);
          });
      }

    })();
  }, []);

  useEffect(() => {
    (async function () {
      // est-ce une annonce gagnante ?
      if (annonce.type_anncs == 1) {
        // initalisation de la réf s'il gagne | generation de ref

        //préciser que c'est une annonce gagnante
        setIsWinner(true);

        await client
          .get("generateur/ref")
          .then((res) => {
            // const d = res.data.data.ref;
            setRef(res.data.data.ref);
            setDestination(WinnerUrl + res.data.data.ref);
            useCookie.setCookie("annonce", annonce);
          })
          .catch((err) => console.error(err));
      }

      setDestination(annonce.url_des);

      console.log(image);
      setImage(false);
    })();
  }, [annonce]);

  // format d'affichage de l'annonce
  useEffect(() => {
    (async function () {

      // setTimeout(() => {
      setMedias(annonce.media);
      //els = { ...medias }
      for (let i = 0; i < medias.length; i++) {
        els[i] = medias[i];
      }
      console.log(els);
      // set the add type
      if (medias.length > 1) {
        setAddEl(<SliderAdd onClick={onDestClick} list={els} />);
      } else {
        setAddEl(
          <img
            src={process.env.REACT_APP_API_BASE_URL + "/" + medias[0].url_med}
            alt="annonce"
            className="scangif p-0 img-fluid"
            onClick={onDestClick}
          />
        );
      }

      // }, 5000);
    })();
  }, [ref, annonce.media, medias]);

  return (
    <div className="text-center">
      {loading ? (
        <ClipLoader loading={loading} size={80} />
      ) : (
        <div className="card bg-transparent text-center border-0">
          <div className="card-header bg-transparent border-0">
            <h3 className="title-s-1 text-danger my-3">Clique sur l'image !</h3>
          </div>

          <div className="mb-2 d-flex flex-column justify-content-center align-items-center">
            <div className=" text-center">
              {addEl}
            </div>
          </div>

          <div className="text-center bg-transparent mt-4 border-0">
            {/* <p> {annonce.description}</p> */}
          </div>

          <ButtonPrimary toUrl="/scanpage" text="Scanne à nouveau" actions />
        </div>
      )}
    </div>
  );
};

export default Place;
