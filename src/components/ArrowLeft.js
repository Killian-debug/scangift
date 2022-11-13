import React from 'react';
import { useNavigate } from "react-router-dom";

const ArrowLeft = () => {
    const history = useNavigate()

    function handleClick() {
        history(-1) ;
      }
    
    return (
        <i className="fa fa-arrow-left back-arrow" aria-hidden="true" onClick={handleClick} ></i>
    );
};

export default ArrowLeft;