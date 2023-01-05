import React, { useEffect, useState } from "react";
import client from "../hooks/Data.js";
import { useParams } from 'react-router-dom';
import ClipLoader from "react-spinners/ClipLoader";
import SliderAdd from "../components/SliderAdd";
import ButtonPrimary from "../components/ButtonPrimary";
import useCookie from "../hooks/Cookie";
import {WinnerUrl} from "../hooks/Env";

const Place = () => {
  const [annonce, setAnnonce] = useState({});
  const [isWinner, setIsWinner] = useState(Boolean);
  const [ref, setRef] = useState();
  // decrémentation de limite
  const [image, setImage] = useState(true);
  
  const [loading, setLoading] = useState(false);

  var els = []
  const [medias, setMedias] = useState();

  const [addEl, setAddEl] = useState();
  //var addEl  // element de l'annonce

  var destination = isWinner ? WinnerUrl + ref : annonce.url_des;

  useEffect(() => {
    setLoading(true)
   
    if( document.readyState === "complete" ) {
      setLoading(false)
    }
  }, [loading]);

  window.onload = (event) => {
    setLoading(false)
    console.log('La page est complètement chargée');
  };

  window.onbeforeunload = (event) => {
    const e = event || window.event;
    // Cancel the event
    e.preventDefault();
    if (e) {
      e.returnValue = ''; // Legacy method for cross browser support
    }
    return ''; // Legacy method for cross browser support
  };

  const onDestClick = () => {
    client.post("gagner", {
      idAnncs : annonce.id_anncs,
      idEvent : annonce.id_event,
      ref : ref, 
    });
    console.log("CTA clicked");

    window.open(destination, '_blank', 'noopener noreferrer')
    // window.location.replace(destination)
    
  };

  const [msgToPlace, setMsgToPlace] = useState('');
  let {giftplace} = useParams();


  useEffect(() => {
    if(giftplace && giftplace !== "" ){
        setMsgToPlace( "ScanGift avec " + giftplace.replace(/-/g,' ' ))
        console.log('place : ' + giftplace )
    }     
  }, [giftplace, msgToPlace]);

  useEffect(() => {
    (async function () {
      if (
        useCookie.ifCookie("annonce") === false ||
        useCookie.getCookie("annonce") === ""
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
      }
       
    })();
  }, []);

  useEffect(() => {
    (async function (){ // est-ce une annonce gagnante ?
     if (annonce.type_anncs == 1) {
      // initalisation de la réf s'il gagne | generation de ref
      
      //préciser que c'est une annonce gagnante
      setIsWinner(true);
      useCookie.setCookie("annonce", JSON.stringify(annonce));
      
      await client
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
  })() 
  }, [annonce.type_anncs]); 


  // format d'affichage de l'annonce
  useEffect(() => {
    (async function() {
      // setTimeout(() => {
        setMedias(annonce.media)
        //els = { ...medias }
        for (let i = 0; i < medias.length; i++) {
          els[i] = medias[i];
          }
        console.log(els)
        // set the add type
       
        if ((medias.length > 1)) {
          setAddEl(<SliderAdd onClick={onDestClick} list={els} />)
        } else {
          setAddEl(<img src={process.env.REACT_APP_API_BASE_URL+'/'+medias[0].url_med} alt="annonce" className="scangif p-0 img-fluid" onClick={onDestClick} />)
        }
        console.log(image)
        setImage(true)
      // }, 5000); 
    } )()
  }, [ref, annonce.media, image, medias]); 
  

  return (
    <div className="text-center" >
      <div className="card bg-transparent text-center border-0">
        <div className="card-header bg-transparent border-0">
          <h3 className="title-s-1 mt-3">
          {msgToPlace} 
          </h3>
        </div>
        <div className="mb-2 d-flex flex-column justify-content-center align-items-center">
          <div className=" text-center">
          <p className="font-italic text-danger mt-2" >Clique sur l'image !</p>

            {/* <img src={imgUrl} alt="annonce" className="img-fluid" /> */}
            { loading ?  <ClipLoader
            loading={loading}
            size={80}
          /> :  addEl }
          </div>

        </div>  
        <div className="text-center bg-transparent border-0">
         <p> { annonce.description }</p>
            </div>
        </div >

      {/* Button principal en bas de page */}
      <ButtonPrimary toUrl='/scanpage' text="Scanne à nouveau" />
    </div>
  );
};

export default Place;
