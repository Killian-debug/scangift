import React, {useEffect, useState} from 'react';
import { NavLink } from "react-router-dom";
import ArrowLeft from '../components/ArrowLeft';
import addImg from "../assets/img/pub2.jpg";
import client from '../hooks/Data.js'
import SliderAdd from '../components/SliderAdd'
import ButtonPrimary from '../components/ButtonPrimary';
import useCookie from '../hooks/Cookie';


const GiftPage = () => {

    // const [imgUrl, setImgUrl] = useState(addImg);
    const [annonce, setAnnonce] = useState({});

    // decrémentation de limite 
    // generation de ref
    // add dans gagner

    const i = Math.floor(Math.random() * 10)

    
    useEffect(() => {

        if (useCookie.existCookie('annonce')  ) {
            client.get('photos/'+i)
            .then(res => {
                setAnnonce(res.data)
                //setImgUrl(res.data.url)
                useCookie.setCookie('annonce', annonce)
                console.log('form query : ' + annonce)
            })
            .catch( err => {
                console.error(err)
            } )
        } else {
            setAnnonce(useCookie.getCookie('annonce'))
            console.log('from cookie : ' + annonce )
        }
       
    }, []);

    var destination, msg, onDestClick = 'Visiter'


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
            <ArrowLeft/>
            <div className="card-header bg-transparent border-0">
                <h3 className='title-s-1 my-4' >{annonce.title}</h3>
            </div>
            <div className="card-body d-flex flex-column justify-content-center align-items-center">
                <div className="scangif m-4 text-center">
                    <img src={annonce.url} alt="annonce" className="img-fluid" />
                    {/* <SliderAdd /> */}
                </div>

            </div>
            {/* <div className="card-footer text-center bg-white">
               
            </div> */}
        </div>
        {/* <div className="btn-principal mx-auto text-center"> */}
        
        {/* Button principal en bas de page */}
            <ButtonPrimary toUrl={destination} text='Visiter' action={onDestClick} />
        
    </div>
    );
};

export default GiftPage;