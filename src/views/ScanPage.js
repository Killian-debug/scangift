import React, { useState} from 'react';
import { QrReader } from 'react-qr-reader';
import { NavLink } from "react-router-dom";
import ArrowLeft from '../components/ArrowLeft';

// import {Html5QrcodeScanner} from "html5-qrcode"

import ClipLoader from 'react-spinners/ClipLoader';

const ScanPage = () => {

    const [data, setData] = useState('No data');
    const [loading, setloading] = useState();
    
    //url du typeForm
    const typeForm = '';


    // const readerStyle = {
       
    //     width : '100%'
    // }

    const handleErrorScan = (result, error) => {
        if (!!result) {
            setloading(true)
            setData(result?.text);
            setloading(false)
            //redirect('/scangift')
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
                        <h3 className='title-s-1' >Scan en cours...</h3>
                    </div>

                    <div className="card-body d-flex flex-column justify-content-center align-items-center">
                    {/* <div id="reader" width="50%" ></div> */}
                        <QrReader
                        // containerStyle={readerStyle}
                        scanDelay={300}
                        onResult={handleErrorScan}
                        className='qrReader'
                        constraints={{ facingMode: 'environment' }}
                        // containerStyle={readerStyle}
                        // onResult={handleErrorScan}
                        // legacy
                />
                       
                    </div>
                    <div className='loader'>
                        <ClipLoader
                           
                            loading={loading}
                            size={70}
                            aria-label="Scanne en cours"
                        />
                    </div>
                    <div className="card-footer bg-transparent">
                        <div className="btn-go">
                            <div className="btn-circle-go">
                                <p className='text-go' > Resultat : {data} </p>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="btn-principal text-center">
                    <NavLink to={typeForm} >
                        <button className="button-79" >Faire ma publicité</button>
                    </NavLink>
                </div>
           
        </div>
    );
};

export default ScanPage;