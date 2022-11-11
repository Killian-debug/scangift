import React from 'react';
import scangif from "../assets/img/qr-code-scanner-tuto.gif";
//import { Container } from "@material-ui/core";

const HomeOld = () => {
    return (
        <div className='d-flex flex-column justify-content-center align-items-center' >
            <h3 className='title-s-1 my-4' >Scanner pour gagner !</h3>
            <div className="scangif m-4">
                <img src={scangif} alt="Scan tuto" className="img-fluid rounded-circle scangif" />
            </div>
            <div className="btn-go">
                <div className="btn-circle-go">
                    <p className='text-go' >GO</p>
                </div>
            </div>
            <div className="btn-principal">

            <button className="button-79">Button 79</button>
            </div>

        </div>
    );
};

export default HomeOld;