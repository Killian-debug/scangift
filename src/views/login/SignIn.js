import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const SignIn = () => {
    const [number, setNumber] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log({ number, password });
        setPassword("");
        setNumber("");
    };

    const gotoSignUpPage = () => navigate("/register");

    return (
        <div className='login__container'>
            <h2>Se connecter </h2>
            <form className='login__form' onSubmit={handleSubmit}>
                <label htmlFor='number'>Numéro</label>
                <input
                    type='text'
                    id='number'
                    name='number'
                    value={number}
                    required
                    onChange={(e) => setNumber(e.target.value)}
                />
                <label htmlFor='password'>Password</label>
                <input
                    type='password'
                    name='password'
                    id='password'
                    minLength={8}
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
                <button className='loginBtn'>Se connecter</button>
                <p>
                    Vous n'avez pas de compte ?{" "}
                    <span className='link' onClick={gotoSignUpPage}>
                        S'inscrire
                    </span>
                </p>
            </form>
        </div>
    );
};

export default SignIn;