import React, { useEffect, useRef, useState } from "react";
import ArrowLeft from "../components/ArrowLeft";
import client from "../hooks/Data.js";
import SliderAdd from "../components/SliderAdd";
import ButtonPrimary from "../components/ButtonPrimary";
import useCookie from "../hooks/Cookie";
import addImg from "../assets/img/pub1.jpeg";
import {WinnerUrl} from "../hooks/Env";

const GiftPage = () => {
  const [imgUrl, setImgUrl] = useState(addImg);
  const [annonce, setAnnonce] = useState({});
  const [isWinner, setIsWinner] = useState();
  const [ref, setRef] = useState({ ref: "" });
  // decrémentation de limite

  


  var addEl = useRef() ; // element de l'annonce

  var destination = WinnerUrl + ref.ref ;

  const msg = "Visiter";

  const onDestClick = () => {
    console.log("CTA clicked");
  };

  useEffect(() => {
    (async function () {
      if (
        !useCookie.ifCookie("annonce") ||
        useCookie.getCookie("annonce") == ""
      ) {
        client
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

  useEffect(() => {
    (async function (){ // est-ce une annonce gagnante ?
     if (annonce.type_anncs == 1) {
        
      //préciser que c'est une annonce gagnante
      setIsWinner(true);
      
      // initalisation de la réf s'il gagne | generation de ref
       client
        .get("generateur/ref")
        .then((res) => {
          const d = res.data.data;
          setRef(d); 
          console.log(d);

          client.post("gagner", {
            idAnncs : annonce.id_anncs,
            idEvent : annonce.id_event,
            ref : d.ref, 
          });
          })
        .catch((err) => console.error(err));        
    } 
      setIsWinner(false)
  })() 
  }, [annonce.type_anncs]); 


  

  // window.onbeforeunload = (event) => {
  //     const e = event || window.event;
  //     // Cancel the event
  //     e.preventDefault();
  //     if (e) {
  //       e.returnValue = ''; // Legacy method for cross browser support
  //     }
  //     return ''; // Legacy method for cross browser support
  //   };
 var els = []
  // format d'affichage de l'annonce
  useEffect(() => {
    (async function() {
      // setTimeout(() => {
        var medias = annonce.media
        //els = { ...medias }
        for (let i = 0; i < medias.length; i++) {
          els[i] = medias[i];
          }
        console.log(els)
        // set the add type
        if ((medias.length > 1)) {
          addEl.current = <SliderAdd list={els} />
        } else {
          addEl.current = <img src={medias[0].url_med} alt="annonce" className="img-fluid" />
        }
        setIsWinner(isWinner)
        console.log(isWinner)
      // }, 3000); 
    } )()
  }, [isWinner]);
 

  return (
    
    <div>
      <div className="card bg-transparent text-center border-0">
        <ArrowLeft />
        <div className="card-header bg-transparent border-0">
          <h3 className="title-s-1 my-4">
            { isWinner ? 'Felicitations !' : '' } {annonce.id_anncs}{" "}
          </h3>
        </div>
        <div className="card-body d-flex flex-column justify-content-center align-items-center">
          <div className="scangif m-2 text-center">
            {/* <img src={imgUrl} alt="annonce" className="img-fluid" /> */}
            {addEl.current}
          </div>
        </div> 
        <div className="card-footer text-center bg-white">
        { isWinner ? '' : annonce.description }
            </div>
      </div>

      {/* Button principal en bas de page */}
      <ButtonPrimary toUrl={destination} text={msg} action={onDestClick} />
    </div>
  );
};

export default GiftPage;
