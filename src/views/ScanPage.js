import React, { useState, useEffect } from "react";
import { QrReader } from "react-qr-reader";
// import { NavLink, redirect } from "react-router-dom";

import Popup from "reactjs-popup";

import ClipLoader from "react-spinners/ClipLoader";

import SetIP, { getIP } from "../hooks/SetIp";
import useCookie from "../hooks/Cookie";
import client from "../hooks/Data";
// import ButtonPrimary from "../components/ButtonPrimary";

// import { FormUrl } from "../hooks/Env"; //URL du type form

const ScanPage = () => {
  const [urlScanned, setUrlScanned] = useState("");
  const [loading, setLoading] = useState(true);
  const [title, setTitle] = useState("Cherchez un Qr Code");

  const [successPop, setSuccessPop] = useState(false);
  const [failedPop, setFailedPop] = useState(false);
  const [warningMsg, setWarningMsg] = useState("");


  const closeModal = () => {
    setSuccessPop(false)
    setFailedPop(false)
    setWarningMsg("")
  };


  //const [redirectMsg, setRedirectMsg] = useState('');

  const Url_Valide = (UrlTest) => {
    var regexp = /[(http(s)?):(www.)?a-zA-Z0-9@:%._+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_+.~#?&//=]*)/ig;

    // if (regexp.test(UrlTest)){
    //   alert ('Mon URL est valide');
    // } else{
    //   alert ("Mon URL n'est PAS valide");
    // }
    return regexp.test(UrlTest) ;
  }

  useEffect(() => {
      if (!loading) {
        setTitle("Cherche un Qr Code");
      }
  }, [loading]);

  useEffect(() => {
    
    SetIP()

  });
  

  useEffect(() => {
    (async function () {
     
        await client
          .post("/visite")
          .then((res) => {
            const data = res.data.messageJson;

            console.log(data);
            //useCookie.setCookie("annonce", JSON.stringify(data));
          })
          .catch((err) => {
            console.error(err);
          });
     
    })();
  }, []);

  

  // const redirectToUrl = () => {
  //   setTimeout(() => {
  //     // 👇️ directly change the active URL to navigate
  //     window.location.href = urlScanned;
  //   }, 3000);
  // };


  const handleErrorScan = (result, error) => {
    if (!!result) {
      setTitle("Scan en cours...")

      setLoading(false);
      setUrlScanned(result?.text)
      // setSuccessPop(true)
      //window.open(urlScanned, '_blank', 'noopener,noreferer')
      if ( Url_Valide(result?.text) === true ) {
        
        setSuccessPop(true)
        setFailedPop(false);
      } else {
        setFailedPop(true);
        setSuccessPop(false)
        setWarningMsg("Assurez-vous de scanner un QrCode ScanGift")
      }
   
    }
    if (!!error) {
      console.error(error);
    }
  };
  return (
    <div>
      <div className="card text-center bg-transparent border-0">
         <div className="card-header bg-transparent border-0">
          <h3 className="title-s-1">{title}</h3>
        </div>

        <div className="card-body d-flex flex-column justify-content-center align-items-center my-2">
          {/* <div id="reader" width="50%" ></div> */}
          <QrReader
            // containerStyle={readerStyle}
            scanDelay={500}
            onResult={handleErrorScan}
            className="qrReader"
            constraints={{ facingMode: "environment" }}
          />
        </div>
        <div className="loader">
        <ClipLoader
            loading={loading}
            size={80}
            aria-label="Scanne en cours"
          />
        </div>

        <div className="card-footer bg-transparent border-0">
          <div className="btn-go">
            <div className="btn-circle-go">
              <p className="text-go color-warning">
               {warningMsg} 
              </p>
            </div>
          </div>
        </div>
        <Popup open={successPop} closeOnDocumentClick onClose={closeModal}>
          <span className="close" type='button' onClick={closeModal}>
            &times;
          </span>
        <div className="modal">
         
        </div>
        <p className="content" > Je tente ma chance ! </p>
          <div className="actions d-flex justify-content-end">
              <a href={urlScanned} className='text-right' target="_blank" rel='noreferrer'>
                <button
                  className="btn-primary"
                  onClick={() => {
                    console.log("modal go to url ");
                  }}
                >
                  Okay
                </button>
              </a>

            </div>
      </Popup>
      <Popup open={failedPop} closeOnDocumentClick onClose={closeModal}>
          <span className="close" type='button' onClick={closeModal}>
            &times;
          </span>
        <div className="modal">
         
        </div>
        <p className="content" > QrCode Non Valide !  </p>
          <div className="actions d-flex justify-content-end">
              <a type="button" className='text-right' target="_blank" rel='noreferrer'>
                <button
                  className="btn-danger"
                  onClick={() => {
                    closeModal()
                    console.log("modal go to url ");
                  }}
                >
                  Okay
                </button>
              </a>

            </div>
      </Popup>
      </div>

      {/* Button principal en bas de page */}
      {/* <ButtonPrimary toUrl={form} text="Faire ma publicité" /> */}
    </div>
  );
};

export default ScanPage;