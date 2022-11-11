import React from 'react';
import { NavLink } from "react-router-dom";

const GoButton = ({text, toUrl}) => {

    const navStyle = {
        display : 'contents'
    };

    return (
        // <div>
        //     <div className="btn-go my-4">
        //         <div className="btn-circle-go">
        //             <p className='btn btn-principal text-go' >{text}</p>
        //         </div>
        //     </div>
        // </div>
        
          
            <div id="wrapper">
                <NavLink to={toUrl} style={navStyle} >
                    <span className="my-super-cool-btn">
                        <div className="dots-container">
                            <div className="dot"></div>
                            <div className="dot"></div>
                            <div className="dot"></div>
                            <div className="dot"></div>
                        </div>
                        <span>{text}</span>
                    </span>
                </NavLink>
            </div>
                
     
        
    );
};

export default GoButton;