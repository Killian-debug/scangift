import React from 'react';

const Footer = () => {

    const style = {
        "bottom" : "0",
    }

    return (
        <div className='d-flex justify-content-center text-center mx-4 mt-2 pt-2 border-top border-5 border-secondary' style={style} >
            <p > <i class="fa fa-mobile"></i> : <a href="https://wa.me/+22940538164" target="_blank" rel="noopener noreferrer">+229 40 53 81 64</a> | <i class="fa fa-instagram" aria-hidden="true"></i> : <a href="https://instagram.com/scan.gift" target="_blank" rel="noopener noreferrer">@scan.gift</a> </p>
        </div>
    );
};

export default Footer;