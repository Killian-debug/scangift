import React from 'react';
import scangif from "../assets/img/qr-code-scanner-tuto.gif";
import GoButton from '../components/GoButton.js';
import ButtonPrimary from '../components/ButtonPrimary';
import typeForm from "../hooks/FormUrl";

const Home = () => {

    //url du typeForm
    //const typeForm = typeForm;

    return (
        <div>
            <div className="card bg-transparent text-center border-0">
                <div className="card-header bg-transparent border-0">
                    <h3 className='title-s-1 my-2' >Scanner pour gagner !</h3>
                </div>
                <div className="card-body d-flex flex-column justify-content-center align-items-center">
                    <div className="scangif m-2 text-center">
                        <img src={scangif} alt="Scan tuto" className="img-fluid rounded-circle scangif" />
                    </div>

                    <GoButton toUrl="/scanpage" text="GO" />
                </div>
                {/* <div className="card-footer text-center bg-white">
                   
                </div> */}
            </div>
            
            {/* Button principal en bas de page */}
                <ButtonPrimary toUrl={typeForm} text="Faire ma publicité" />
            
        </div>
    );
};

export default Home;