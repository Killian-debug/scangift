import React, { useState, useEffect} from 'react';
import { QrReader } from 'react-qr-reader';
// import { NavLink, redirect } from "react-router-dom";
import ArrowLeft from '../components/ArrowLeft';

// import {Html5QrcodeScanner} from "html5-qrcode"

import ClipLoader from 'react-spinners/ClipLoader';
import ButtonPrimary from '../components/ButtonPrimary';

const ScanPage = () => {

    const [data, setData] = useState('No data');
    const [loading, setloading] = useState();
    const [title, setTitle] = useState('Cherchez un Qr Code');
    
    //url du typeForm
    const typeForm = '';
    


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
            setData(result?.text);
            setloading(false)
            window.open(data, '_blank', 'noopener,noreferrer')
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
                    
                    <div className="card-body d-flex flex-column justify-content-center align-items-center my-4">
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
                                <p className='text-go' > Resultat : {data} </p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Button principal en bas de page */}
                    <ButtonPrimary toUrl={typeForm} text='Faire ma publicité' action='' />
               
           
        </div>
    );
};

export default ScanPage;