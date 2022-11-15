import React, {useEffect, useState} from 'react';
import { NavLink } from "react-router-dom";
import ArrowLeft from '../components/ArrowLeft';
import addImg from "../assets/img/pub2.jpg";
import client from '../data/Data.js'
import SliderAdd from '../components/SliderAdd'
import ButtonPrimary from '../components/ButtonPrimary';


const GiftPage = () => {

    const [imgUrl, setImgUrl] = useState(addImg);
    const [annonce, setAnnonce] = useState(null);
    
    useEffect(() => {
        client.get('photos/1')
        .then(res => {
            setAnnonce(res.data)
            console.log(res)
        })
        .catch( err => {
            console.error(err)
        } )
       
    }, []);

    var destination, msg, onDestClick = ''


    window.onbeforeunload = (event) => {
        const e = event || window.event;
        // Cancel the event
        e.preventDefault();
        if (e) {
          e.returnValue = ''; // Legacy method for cross browser support
        }
        return ''; // Legacy method for cross browser support
      };

    return ( 
        <div>
        <div className="card bg-transparent text-center border-0">
            <ArrowLeft/>
            <div className="card-header bg-transparent border-0">
                <h3 className='title-s-1 my-4' >Gift or pub page !</h3>
            </div>
            <div className="card-body d-flex flex-column justify-content-center align-items-center">
                <div className="scangif m-4 text-center">
                    {/* <img src={imgUrl} alt="annonce" className="img-fluid" /> */}
                    <SliderAdd />
                </div>

            </div>
            {/* <div className="card-footer text-center bg-white">
               
            </div> */}
        </div>
        {/* <div className="btn-principal mx-auto text-center"> */}
        
        {/* Button principal en bas de page */}
            <ButtonPrimary toUrl={destination} text={msg} action={onDestClick} />
        
    </div>
    );
};

export default GiftPage;