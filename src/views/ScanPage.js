import React, { useState, useEffect } from "react";
import { QrReader } from "react-qr-reader";
// import { NavLink, redirect } from "react-router-dom";
import ArrowLeft from "../components/ArrowLeft";

import Popup from "reactjs-popup";

import ClipLoader from "react-spinners/ClipLoader";
import ButtonPrimary from "../components/ButtonPrimary";

import { FormUrl } from "../hooks/Env"; //URL du type form

const ScanPage = () => {
  const [urlScanned, setUrlScanned] = useState("");
  const [loading, setloading] = useState(false);
  const [title, setTitle] = useState("Cherchez un Qr Code");

  const [open, setOpen] = useState(false);
  const closeModal = () => setOpen(false);

  //const [redirectMsg, setRedirectMsg] = useState('');
  const form = FormUrl;

  function Url_Valide(UrlTest) {
    var regexp =
      /[(http(s)?):(www.)?a-zA-Z0-9@:%._+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_+.~#?&//=]*)/;

    // if (regexp.test(UrlTest)){
    //   alert ('Mon URL est valide');
    // } else{
    //   alert ("Mon URL n'est PAS valide");
    // }
    return regexp.test(UrlTest.toString());
  }

  useEffect(() => {
    if (loading) {
      setTitle("Scan en cours...");
    } else {
      setTitle("Cherchez un Qr Code");
    }
  }, [loading]);

  // const redirectToUrl = () => {
  //   setTimeout(() => {
  //     // 👇️ directly change the active URL to navigate
  //     window.location.href = urlScanned;
  //   }, 3000);
  // };

  const handleErrorScan = (result, error) => {
    if (!!result) {
      setloading(true);
      setUrlScanned(result?.text);
      setloading(false);

      //window.open(urlScanned, '_blank', 'noopener,noreferer')
      // if (Url_Valide(urlScanned)) {

      // } else {
      //     console.log('data scanned :' + urlScanned)
      // }
      setOpen(true)
    }
    if (!!error) {
      console.info(error);
    }
  };

  return (
    <div>
      <div className="card text-center bg-transparent border-0">
        <ArrowLeft />

        <div className="card-header bg-transparent border-0">
          <h3 className="title-s-1">{title}</h3>
        </div>

        <div className="card-body d-flex flex-column justify-content-center align-items-center my-2">
          {/* <div id="reader" width="50%" ></div> */}
          <QrReader
            // containerStyle={readerStyle}
            scanDelay={300}
            onResult={handleErrorScan}
            className="qrReader"
            constraints={{ facingMode: "environment" }}
          />
        </div>
        <div className="loader">
          <ClipLoader
            loading={loading}
            size={70}
            aria-label="Scanne en cours"
          />
        </div>

        <div className="card-footer bg-transparent border-0">
          <div className="btn-go">
            <div className="btn-circle-go">
              <p className="text-go">
               {urlScanned} {Url_Valide(urlScanned)}
              </p>
            </div>
          </div>
        </div>
        <Popup open={open} closeOnDocumentClick onClose={closeModal}>
          <a className="close" href='google.com' onClick={closeModal}>
            &times;
          </a>
        <div className="modal">
         
        </div>
        <p className="content" > Aller vers <a className="d-inline d-flex" href={urlScanned} target="_blank" rel="noreferrer" >{urlScanned}</a>  </p>
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
      </div>

      {/* Button principal en bas de page */}
      <ButtonPrimary toUrl={form} text="Faire ma publicité" />
    </div>
  );
};

export default ScanPage;