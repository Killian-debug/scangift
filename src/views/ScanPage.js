import React, { useState, useEffect} from 'react';
import { QrReader } from 'react-qr-reader';
// import { NavLink, redirect } from "react-router-dom";
import ArrowLeft from '../components/ArrowLeft';

import ClipLoader from 'react-spinners/ClipLoader';
import ButtonPrimary from '../components/ButtonPrimary';

import {FormUrl} from "../hooks/Env"; //URL du type form

const ScanPage = () => {

    const [urlScanned, setUrlScanned] = useState('No data');
    const [loading, setloading] = useState(false);
    const [title, setTitle] = useState('Cherchez un Qr Code');
    
    const form = FormUrl

    function Url_Valide(UrlTest) {
        
        var regexp = /[(http(s)?):(www.)?a-zA-Z0-9@:%._+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_+.~#?&//=]*)/ig ;
         
        // if (regexp.test(UrlTest)){
        //   alert ('Mon URL est valide');
        // } else{
        //   alert ("Mon URL n'est PAS valide");
        // }
        return regexp.test(UrlTest);
      }
    
    useEffect(() => {
        if (loading) {
            setTitle('Scan en cours...')
        } else {
            setTitle('Cherchez un Qr Code')
        }
    }, [loading]);


    const handleErrorScan = (result, error) => {
        
        
        if (!!result) {
            setloading(true)
            setUrlScanned(result?.text);
            setloading(false)

            if (Url_Valide(urlScanned)) {
                window.open(urlScanned, '_blank', 'noopener,noreferrer') 
            } else {
                console.log('data scanned :' + urlScanned)
            }
            setloading(false)
        }
        if (!!error) {
            console.info(error);
            
        }
    };

    return (
        <div>
                <div className="card text-center bg-transparent border-0">
                <ArrowLeft/>

                    <div className="card-header bg-transparent border-0">
                        <h3 className='title-s-1' >{title}</h3>
                    </div>
                    
                    <div className="card-body d-flex flex-column justify-content-center align-items-center my-2">
                    {/* <div id="reader" width="50%" ></div> */}
                        <QrReader
                        // containerStyle={readerStyle}
                        scanDelay={300}
                        onResult={handleErrorScan}
                        className='qrReader'
                        constraints={{ facingMode: 'environment' }}
                />
                       
                    </div>
                    <div className='loader'>
                        <ClipLoader
                           
                            loading={loading}
                            size={70}
                            aria-label="Scanne en cours"
                        />
                    </div>
                    <div className="card-footer bg-transparent border-0">
                        <div className="btn-go">
                            <div className="btn-circle-go">
                                <p className='text-go' > Resultat : {urlScanned} </p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Button principal en bas de page */}
                    <ButtonPrimary toUrl={form} text='Faire ma publicité' />
               
           
        </div>
    );
};

export default ScanPage;