import React, { useEffect, useState } from "react";
import ArrowLeft from "../components/ArrowLeft";
import client from "../hooks/Data.js";
// import SliderAdd from "../components/SliderAdd";
import ButtonPrimary from "../components/ButtonPrimary";
import useCookie from "../hooks/Cookie";

const GiftPage = () => {
  // const [imgUrl, setImgUrl] = useState(addImg);
  const [annonce, setAnnonce] = useState("");
  //const [isWinner, setIsWinner] = useState(false);

  // decrémentation de limite
 
  

  const i = Math.floor(Math.random() * 10) + 1;
  //var addEl; // element de l'annonce
  //var ref;

  var destination = "https://wa.me/97157731?text=from%20scangift:%20" ;

  const msg = "Visiter";

  const onDestClick = () => {
    console.log("CTA clicked");
  };

  useEffect(() => {
    if (!useCookie.ifCookie("annonce")) {
      client
        .get("photos/" + i)
        .then((res) => {
          setAnnonce(res.data);
          console.log("ann :" + JSON.stringify(annonce));
          //setImgUrl(res.data.url)
          useCookie.setCookie("annonce", annonce);
          console.log("from query : " + JSON.stringify(annonce));
        })
        .catch((err) => {
          console.error(err);
        });
    } else {
      var data = useCookie.getCookie("annonce");
      console.log("from cookie :" + data);
      data = JSON.parse(data);
      setAnnonce(data);

      // est-ce une annonce gagnante ?
      //if (annonce.type === 1) setIsWinner(true);
    }
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
  //       id_anncs : annonce.id,
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
          <h3 className="title-s-1 my-4">{annonce.title}</h3>
        </div>
        <div className="card-body d-flex flex-column justify-content-center align-items-center">
          <div className="scangif m-4 text-center">
          <img src={annonce.url} alt="annonce" className="img-fluid" />;  
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
