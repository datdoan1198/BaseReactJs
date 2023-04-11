import React from 'react';
import styles from './styles.module.scss';
import './styles.scss';
// import logo from 'assets/images/logo.png';
import {Button} from "antd";

const LoginLayout = (props) => {

    return (
        <div className={styles.LoginLayoutWrap}>
            <main>
                {props.children}
            </main>
        </div>
    );
}

export default LoginLayout;
