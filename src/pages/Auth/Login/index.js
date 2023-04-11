import React, {useState} from 'react';
import PropTypes from "prop-types";
import styles from "./styles.module.scss";
import './styles.scss'
import {Button, Checkbox, Input} from "antd";
import {useDispatch, useSelector} from "react-redux";
import {handleLogin, setFlagStatusRegister, setLoadingButtonLogin} from "../../../state/modules/auth";
import { isValidPhone } from "../../../utils/helper";
import { WarningOutlined, HeartOutlined } from "@ant-design/icons";
import Register from "../Register";
import thumbnailHeader from 'assets/images/Auth/imageAdmin.png'
import iconZent from 'assets/images/Logo/icon-zent.png'
import {goToPage, ROUTE_HOME} from "../../../state/modules/routing";

/* Data default */
Register.prototype = {
    activeSign: PropTypes.bool.isRequired,
    handleShowFormSignUp: PropTypes.func
}

Register.defaultProps = {
    activeSign: true
}

const Login = (props) => {
    /* State */
    const [phone, setPhone] = useState('');
    const [errorPhone, setErrorPhone] = useState('');
    const [password, setPassword] = useState('');
    const [errorPassword, setErrorPassword] = useState('');
    const [passwordVisible, setPasswordVisible] = useState(false);
    const loadingBtnLogin = useSelector(state => state.auth.loadingBtnLogin)
    const dispatch = useDispatch();

    /* Handle */
    const handleShowFormRegister = () => {
        dispatch(setFlagStatusRegister(''));
        props.handleShowFormSignUp();
    }

    const handleChangeInput = (valueInput, type) => {
        let value = valueInput.target.value;
        switch (type) {
            case 'phone':
                if (value.length === 0) {
                    setErrorPhone('');
                } else if (!isValidPhone(value)) {
                    setErrorPhone('Số điện thoại không đúng định dạng!');
                } else {
                    setErrorPhone('');
                }
                setPhone(value);
                break
            case 'password':
                if (value.length === 0) {
                    setErrorPassword('');
                } else if (value.length < 6) {
                    setErrorPassword('Mật khẩu phải có ít nhất 6 kí tự!');
                } else {
                    setErrorPassword('');
                }
                setPassword(value);
                break
            default:
                break
        }
    }

    const validateFormRegister = () => {
        let error = false;

        if (phone.length === 0) {
            setErrorPhone('Số điện thoại không được để trống!');
            error = true;
        } else if (!isValidPhone(phone)) {
            setErrorPhone('Số điện thoại không đúng định dạng!');
            error = true;
        } else {
            setErrorPhone('');
        }

        if (password.length === 0) {
            setErrorPassword('Số điện thoại không được để trống!');
            error = true;
        } else if (password.length < 6) {
            setErrorPassword('Nhập lại mật khẩu phải có ít nhất 6 kí tự!');
            error = true;
        } else {
            setErrorPassword('');
        }

        return error;
    }

    const handleLoginAcount = (routeName) => {
        if (!validateFormRegister()) {
            // dispatch(handleLogin(phone, password));
            dispatch(setLoadingButtonLogin());
            setTimeout(() => {
                dispatch(goToPage(routeName))
            }, 2000);

        }
    }

    return (
        <div className={`login-form ${styles.loginWrap} ${props.activeLogin ? styles.loginWrapActive : ''}`}>
            <div className={styles.headerWrap}>
                <div className={styles.descriptionWrap}>
                    <p className={styles.title}>Chào mừng trở lại!</p>
                    <p className={styles.content}>Đăng nhập</p>
                </div>
                <div className={styles.imgWrap}>
                    <img src={thumbnailHeader} alt={""}/>
                </div>
                <div className={styles.logoWrap}>
                    <img src={iconZent} alt={""}/>
                </div>
            </div>
            <div className={styles.mainWrap}>
                <div className={styles.inputWrap}>
                    <Input
                        className={styles.input}
                        size="small"
                        value={phone}
                        onChange={(e) => handleChangeInput(e, 'phone')}
                        placeholder="Số điện thoại"
                    />
                    {
                        errorPhone ?
                            <span className={styles.error}><WarningOutlined /> {errorPhone}</span> : ''
                    }
                </div>
                <div className={styles.inputWrap}>
                    <Input.Password
                        size="small"
                        value={password}
                        onChange={(e) => handleChangeInput(e, 'password')}
                        className={`style-input ${styles.input}`}
                        placeholder="Mật khẩu"
                        visibilityToggle={{
                            visible: passwordVisible,
                            onVisibleChange: setPasswordVisible,
                        }}
                    />
                    {
                        errorPassword ?
                            <span className={styles.error}><WarningOutlined /> {errorPassword}</span> : ''
                    }
                </div>
                <div className={styles.toolbar}>
                    <Checkbox>Ghi nhớ đăng nhập</Checkbox>
                    {/*<p className={styles.textForgotPassword}>Quên mật khẩu?</p>*/}
                </div>

                <div className={styles.buttonWrap}>
                    <Button loading={loadingBtnLogin} onClick={() => handleLoginAcount(ROUTE_HOME)} size={'large'}>Đăng nhập</Button>
                </div>
                <p className={styles.textFooter}>Bạn chưa có tài khoản hãy <span onClick={() => handleShowFormRegister()} className={styles.textSignUp}>tạo tài khoản</span></p>
                <div className={styles.tipWrap}>
                    <span>© 2023 ZentSoft. Được phát triển bởi</span>
                    <HeartOutlined className={styles.icon}/>
                    <span className={styles.name}>Zent</span>
                </div>
            </div>
        </div>
    );
}

export default Login;
