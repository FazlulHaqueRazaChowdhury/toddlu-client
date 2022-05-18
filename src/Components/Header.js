import React from 'react';

import auth from '../firebase.init';

import { signInWithPopup, GoogleAuthProvider } from "firebase/auth"

import axios from 'axios';
const Header = () => {
    const provider = new GoogleAuthProvider();


    const handleGoogle = () => {
        signInWithPopup(auth, provider)
            .then((result) => {
                // This gives you a Google Access Token. You can use it to access the Google API.

                // The signed-in user info.
                const user = result.user;
                axios.put(`http://localhost:4000/signIn/${user.email}`)
                    .then(res => {
                        localStorage.setItem('accessToken', res.data.token);
                    });
                // ...
            })
    }
    return (
        <div>
            <button className="btn btn-outline-primary w-full my-4 " onClick={() => {
                handleGoogle();
            }}>Sign In With Google</button>
        </div>
    );
};

export default Header;