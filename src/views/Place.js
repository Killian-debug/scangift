import React, {useEffect, useState} from 'react';
import { useParams } from 'react-router-dom';
import GoButton from '../components/GoButton.js';
import ButtonPrimary from '../components/ButtonPrimary';
import placeimg from "../assets/img/fruitizz.jpg";



const Place = () => {

    const [placeName, setPlaceName] = useState('');
    let {giftplace} = useParams();
    useEffect(() => {
        setPlaceName(giftplace.replace(/-/gi,' ' ))
        console.log('place :' + giftplace )
       
    }, [giftplace]);
    return (
        <div>
            <div className="card bg-transparent text-center border-0">
                <div className="card-header bg-transparent border-0">
                    <h3 className='title-s-1 my-4' >Bienvenue à {placeName}</h3>
                </div>
                <div className="card-body d-flex flex-column justify-content-center align-items-center">
                    <div className="scangif m-0 text-center">
                        <img src={placeimg} alt="place img" style={{ width: '50%' }} className="img-fluid" />
                    </div>

                    <GoButton toUrl="/scanpage" text="Scanner" />
                </div>
                {/* <div className="card-footer text-center bg-white">
                   
                </div> */}
            </div>
            
            {/* Button principal en bas de page */}
                <ButtonPrimary toUrl="" text="Faire ma publicité" action='' />
            
        </div>
    );
};

export default Place;