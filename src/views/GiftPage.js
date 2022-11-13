import React from 'react';
import { NavLink } from "react-router-dom";
import ArrowLeft from '../components/ArrowLeft';
import addImg from "../assets/img/pub2.jpg";

const GiftPage = () => {
    
    return ( 
        <div>
        <div className="card bg-transparent text-center border-0">
            <ArrowLeft/>
            <div className="card-header bg-transparent border-0">
                <h3 className='title-s-1 my-4' >Gift or pub page !</h3>
            </div>
            <div className="card-body d-flex flex-column justify-content-center align-items-center">
                <div className="scangif m-4 text-center">
                    <img src={addImg} alt="annonce" className="img-fluid" />
                </div>

            </div>
            {/* <div className="card-footer text-center bg-white">
               
            </div> */}
        </div>
        <div className="btn-principal mx-auto text-center">
            <NavLink to='' >
                <button className="button-79">Visiter</button>
            </NavLink>
        </div>
    </div>
    );
};

export default GiftPage;