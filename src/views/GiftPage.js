import React, { useEffect, useState } from "react";
import ArrowLeft from "../components/ArrowLeft";
import client from "../hooks/Data.js";
import SliderAdd from "../components/SliderAdd";
import ButtonPrimary from "../components/ButtonPrimary";
import useCookie from "../hooks/Cookie";
import addImg from '../assets/img/pub1.jpeg'

const GiftPage = () => {
  const [imgUrl, setImgUrl] = useState(addImg);
  const [annonce, setAnnonce] = useState({});
  const [isWinner, setIsWinner] = useState(false);
  const [ref, setRef] = useState('');
  // decrémentation de limite
 
 
  var addEl; // element de l'annonce
  var x;
  

  var destination = "https://wa.me/97157731?text=from%20scangift:%20" + ref;

  const msg = "Visiter";

  const onDestClick = () => {
    console.log("CTA clicked");
  };

  useEffect(() => {
     ( async function() {
      if (!useCookie.ifCookie("annonce") || useCookie.getCookie("annonce") == "" ) 
      {
      client
        .get("select/annonce/3")
        .then((res) => {
          const data = res.data.data
          
          setAnnonce(JSON.parse(JSON.stringify(data)));
          console.log(data);
          console.log("ann :" + JSON.stringify(data));
          //setImgUrl(res.data.url)
          //useCookie.setCookie("annonce", JSON.stringify(data));
          
        })
        .catch((err) => {
          console.error(err);
        }); 
       
    } else {
      const data = useCookie.getCookie("annonce");
      const y = JSON.parse(data)
      setAnnonce(y);
      console.log("from cookie :" + annonce.id_anncs); 
      console.log('id_anncs: ' + y.objectif)

     // Est-ce une annonce gagnante ?
      if (annonce.type === 1) setIsWinner(true);
    }

    // est-ce une annonce gagnante ?
    if (annonce.type_anncs == 1) {

      setIsWinner(true);

      // initalisation de la réf s'il gagne | generation de ref
      client
        .get("generateur/ref")
        .then((res) => {
          
          x = res.data.data
          console.log(x.ref)
          setRef(x.ref)
          console.log('ref: ' + ref)
        })
        .catch((err) => console.error(err))
    }

    // // set the add type
    // if ((annonce.medias.lenght = 1)) {
    //   addEl = <img src={annonce.url} alt="annonce" className="img-fluid" />;
    // } else {
    //   addEl = <SliderAdd />;
    // }

     // add dans la table gagner
    //  if (isWinner) {
    //   client.post("/gagner", {
    //     id_anncs : annonce.id_anncs,
    //     ref : ref,
    //   });
    // }
})()
  }, []);


  // useEffect(() => {
  //   // est-ce une annonce gagnante ?
  //   if (annonce.type === 1) {
  //     setIsWinner(true);

  //     // initalisation de la réf s'il gagne | generation de ref
  //     client
  //       .get("/generateur/ref")
  //       .then((res) => (ref = res))
  //       .catch((err) => console.error(err));
  //   }

  //   // set the add type
  //   if ((annonce.medias.lenght = 1)) {
  //     addEl = <img src={annonce.url} alt="annonce" className="img-fluid" />;
  //   } else {
  //     addEl = <SliderAdd />;
  //   }
  // }, []);


  // useEffect(() => {
  //   // add dans la table gagner
  //   if (isWinner) {
  //     client.post("/gagner", {
  //       id_anncs : annonce.id_anncs,
  //       ref : ref,
  //     });
  //   }
  // }, []);


  // window.onbeforeunload = (event) => {
  //     const e = event || window.event;
  //     // Cancel the event
  //     e.preventDefault();
  //     if (e) {
  //       e.returnValue = ''; // Legacy method for cross browser support
  //     }
  //     return ''; // Legacy method for cross browser support
  //   };

  return (
    <div>
      <div className="card bg-transparent text-center border-0">
        <ArrowLeft />
        <div className="card-header bg-transparent border-0">
          <h3 className="title-s-1 my-4">Felicitations ! {annonce.id_anncs} </h3>
        </div>
        <div className="card-body d-flex flex-column justify-content-center align-items-center">
          <div className="scangif m-4 text-center">
          <img src={imgUrl} alt="annonce" className="img-fluid" />  
          </div>
        </div>
        {/* <div className="card-footer text-center bg-white">
               
            </div> */}
      </div>

      {/* Button principal en bas de page */}
      <ButtonPrimary toUrl={destination} text={msg} action={onDestClick} />
    </div>
  );
};

export default GiftPage;
