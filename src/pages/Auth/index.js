import React, {useEffect, useState} from 'react';
import LoginLayout from '../../layouts/LoginLayout'
import styles from "./styles.module.scss";
import './styles.scss'
import Login from "./Login";
import SignUp from "./Register";
import {useSelector} from "react-redux";

const HomePage = () => {
    /* State */
    const [showFormlogin, setShowFormLogin] = useState(true);
    const [activeLogin, setActiveLogin] = useState(true);
    const [showFormSign, setShowFormSign] = useState(false);
    const [activeSign, setActiveSign] = useState(false);
    const flagStatusRegister = useSelector(state => state.auth.flagStatusRegister);

    /* Hook */
    useEffect(() => {
        if (flagStatusRegister === 'success') {
            handleShowFormLogin();
        }
    }, [flagStatusRegister])

    /* Handle */
    const handleShowFormSignUp = () => {
        setActiveLogin(false);
        setTimeout(() => {
            setShowFormLogin(false);
            setShowFormSign(true);
            setTimeout(() => {
                setActiveSign(true);
            }, 200)
        }, 200)
    }

    const handleShowFormLogin = () => {
        setActiveSign(false);
        setTimeout(() => {
            setShowFormSign(false);
            setShowFormLogin(true);
            setTimeout(() => {
                setActiveLogin(true);
            }, 200)
        }, 200)
    }

    return (
        <LoginLayout>
            {
                showFormlogin ?
                    <Login
                        activeLogin={activeLogin}
                        handleShowFormSignUp={() => handleShowFormSignUp()}
                    /> : ''
            }

            {
                showFormSign ?
                    <SignUp
                        activeSign={activeSign}
                        handleShowFormLogin={() => handleShowFormLogin()}
                    /> : ''
            }
        </LoginLayout>
    );
}

export default HomePage
