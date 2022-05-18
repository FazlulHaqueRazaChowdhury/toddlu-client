import React from 'react';
import { useSignInWithGoogle } from 'react-firebase-hooks/auth';
import auth from '../firebase.init';

const Header = () => {
    const [signInWithGoogle, user, loading, error] = useSignInWithGoogle(auth);
    if (loading) {
        <p>Loading</p>
    }
    return (
        <div>
            <button class="btn btn-outline-primary w-full my-4 " onClick={() => {
                signInWithGoogle();
            }}>Sign In With Google</button>
        </div>
    );
};

export default Header;