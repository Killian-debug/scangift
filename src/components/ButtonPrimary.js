import React from 'react';

const ButtonPrimary = ({text, toUrl}) => {
    return (
        <div className="btn-principal mx-auto text-center">
                <NavLink to={toUrl} >
                    <button className="button-79">{text}</button>
                </NavLink>
        </div>
    );
};

export default ButtonPrimary;