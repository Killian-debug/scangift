import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const SignUp = () => {

    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [tel, setTel] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log({ email, username, tel, password });
        setEmail("");
        setTel("");
        setUsername("");
        setPassword("");
    };
    
    const gotoLoginPage = () => navigate("/signin");

    return (
        <div className='signup__container'>
        <h2>Créer un compte </h2>
        <form className='signup__form' onSubmit={handleSubmit}> 
            <label htmlFor='username'>Nom ou structure</label>
            <input
                type='text'
                id='username'
                name='username'
                value={username}
                required
                onChange={(e) => setUsername(e.target.value)}
            />
            <label htmlFor='email'>Email</label>
            <input
                type='email'
                name='email'
                id='email'
                value={email}
                required
                onChange={(e) => setEmail(e.target.value)}
            />
            <label htmlFor='tel'>Numéro de téléphone</label>
            <input
                type='tel'
                name='tel'
                id='tel'
                value={tel}
                required
                onChange={(e) => setTel(e.target.value)}
            />
            <label htmlFor='tel'>Mot de passe</label>
            <input
                type='password'
                name='password'
                id='password'
                minLength={8}
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
            />
            <button className='signupBtn'>CRÉER UN COMPTE</button>
            <p>
                Vous avez déjà un compte ?{" "}
                <span className='link' onClick={gotoLoginPage}>
                    Se connecter
                </span>
            </p>
        </form>
    </div>
    );
};

export default SignUp;