import React, { useEffect, useRef, useState } from "react";
import client from "../hooks/Data.js";
import SliderAdd from "../components/SliderAdd";
import ButtonPrimary from "../components/ButtonPrimary";
import useCookie from "../hooks/Cookie";
import {WinnerUrl} from "../hooks/Env";

const GiftPage = () => {
  const [annonce, setAnnonce] = useState({});
  const [isWinner, setIsWinner] = useState(Boolean);
  const [ref, setRef] = useState();

  const [image, setImage] = useState(true);
  
  const [addEl, setAddEl] = useState();
  //var addEl  // element de l'annonce

  var destination = ref != "" ? WinnerUrl + ref : annonce.url_des;

  const msg = "Visiter";

  const onDestClick = () => {
    client.post("gagner", {
      idAnncs : annonce.id_anncs,
      idEvent : annonce.id_event,
      ref : ref, 
    });
    console.log("CTA clicked");
    
  };

  useEffect(() => {
    (async function () {
      if (
        !useCookie.ifCookie("annonce") ||
        useCookie.getCookie("annonce") == ""
      ) {
        await client
          .get("select/aleatoire/annonce")
          .then((res) => {
            const data = res.data.data;

            setAnnonce(JSON.parse(JSON.stringify(data)));
            console.log(data);
            console.log("ann :" + JSON.stringify(data));
            //useCookie.setCookie("annonce", JSON.stringify(data));
          })
          .catch((err) => {
            console.error(err);
          });
      } else {
        const data = useCookie.getCookie("annonce");
        const y = JSON.parse(data);
        setAnnonce(y);
        console.log("from cookie :" + annonce.id_anncs);
        console.log("id_anncs: " + y.objectif);
      }
       
    })();
  }, []);

  

  useEffect(() => { // est-ce une annonce gagnante ?
     if (annonce.type_anncs == 1) {
        
      //préciser que c'est une annonce gagnante
      setIsWinner(true);
      
      useCookie.setCookie("annonce", JSON.stringify(annonce));

      // initalisation de la réf s'il gagne | generation de ref
      client
        .get("generateur/ref")
        .then((res) => {
          const d = res.data.data.ref;
          setRef(d); 
          console.log(d);
          })
        .catch((err) => console.error(err));        
    } 
    console.log(image)
    setImage(false)
  }, [annonce.type_anncs]); 


  

  window.onbeforeunload = (event) => {
      const e = event || window.event;
      // Cancel the event
      e.preventDefault();
      if (e) {
        e.returnValue = ''; // Legacy method for cross browser support
      }
      return ''; // Legacy method for cross browser support
    };
    
 var els = []
const [medias, setMedias] = useState();
  // format d'affichage de l'annonce
  useEffect(() => {
    (async function() {
      // setTimeout(() => {
        setMedias(annonce.media)
        //els = { ...medias }
        for (let i = 0; i < medias.length; i++) {
          els[i] = medias[i];
          }

        // set the media type
        if ((medias.length > 1)) {
          setAddEl(<SliderAdd list={els} />)
        } else {
          setAddEl(<img src={process.env.REACT_APP_API_BASE_URL+'/'+medias[0].url_med} alt="annonce" className="img-fluid" />)
        }
        console.log(image)
        setImage(true)
      // }, 5000); 
    } )()
  }, [ref, annonce.media, image, medias]); 
  

  return (
    <div>
      <div className="card bg-transparent text-center border-0">
        
        <div className="card-header bg-transparent border-0">
          <h3 className="title-s-1 mb-1">
            { isWinner ? 'Felicitations !' : '' }
          </h3>
        </div>
        <div className="mb-2 d-flex flex-column justify-content-center align-items-center">
          <div className="scangif text-center">
            {addEl}
          </div>
        </div>  
        <div className="text-center bg-transparent border-0">
        {annonce.description }
            </div>
      </div>

      {/* Button principal en bas de page */}
      <ButtonPrimary toUrl={destination} text={msg} action={onDestClick} />
    </div>
  );
};

export default GiftPage;
