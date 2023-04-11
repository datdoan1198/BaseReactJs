import React, {useState} from 'react';
import PropTypes from "prop-types";
import styles from "./styles.module.scss";
import './styles.scss';
import {Button, Checkbox, Input} from "antd";
import {handleRegister, setErrorRegister} from "../../../state/modules/auth";
import {useDispatch, useSelector} from "react-redux";
import {
    HeartOutlined,
    WarningOutlined
} from '@ant-design/icons';
import { isValidPhone } from "../../../utils/helper";
import thumbnailHeader from "../../../assets/images/Auth/imageAdmin.png";
import iconZent from "../../../assets/images/Logo/icon-zent.png";

/* Data default */
Register.prototype = {
    activeSign: PropTypes.bool.isRequired,
    handleShowFormLogin: PropTypes.func
}

Register.defaultProps = {
    activeSign: true
}

function Register (props) {
    /* State */
    const [name, setName] = useState('');
    const [phone, setPhone] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [passwordVisible, setPasswordVisible] = useState(false);
    const [confirmPasswordVisible, setConfirmPasswordVisible] = useState(false);
    const errorRegister = useSelector(state => state.auth.errorRegister);
    const loadingBtnRegister = useSelector(state => state.auth.loadingBtnRegister);
    const [isCheck, setIsCheck] = useState(false);
    const dispatch = useDispatch();

    /* Handle */
    const handleChangeInput = (valueInput, type) => {
        let value = valueInput.target.value;
        switch (type) {
            case 'name':
                errorRegister.name = '';
                setName(value);
                break
            case 'phone':
                if (value.length === 0) {
                    errorRegister.phone = ''
                } else if (!isValidPhone(value)) {
                    errorRegister.phone = 'Số điện thoại không đúng định dạng!'
                } else {
                    errorRegister.phone = ''
                }
                setPhone(value);
                break
            case 'password':
                if (value.length === 0) {
                    errorRegister.confirmPassword = ''
                    errorRegister.password = ''
                } else if (value.length < 6) {
                    errorRegister.password = 'Mật khẩu phải có ít nhất 6 kí tự!'
                } else {
                    errorRegister.confirmPassword = ''
                    errorRegister.password = ''
                }
                setPassword(value);
                break
            case 'confirmPassword':
                if (value.length === 0) {
                    errorRegister.confirmPassword = ''
                    errorRegister.password = ''
                } else if (value.length < 6) {
                    errorRegister.confirmPassword = 'Nhập lại mật khẩu phải có ít nhất 6 kí tự!'
                } else {
                    errorRegister.confirmPassword = ''
                    errorRegister.password = ''
                }
                setConfirmPassword(value)
                break
            default:
                break
        }
    }

    const validateFormRegister = () => {
        let error = false;
        let errorForm = {
            name: '',
            phone: '',
            password: '',
            confirmPassword: ''
        }
        if (name.length === 0) {
            errorForm.name = 'Họ và tên không được để trống!';
            error = true;
        } else {
            errorForm.name = ''
        }

        if (phone.length === 0) {
            errorForm.phone = 'Số điện thoại không được để trống!';
            error = true;
        } else if (!isValidPhone(phone)) {
            errorForm.phone = 'Số điện thoại không đúng định dạng!';
            error = true;
        } else {
            errorForm.phone = '';
        }

        if (password.length === 0) {
            errorForm.password = 'Số điện thoại không được để trống!'
            error = true;
        } else if (password.length < 6) {
            errorForm.password = 'Nhập lại mật khẩu phải có ít nhất 6 kí tự!'
            error = true;
        } else {
            errorForm.password = ''
        }

        if (confirmPassword.length === 0) {
            errorForm.confirmPassword = 'Xác nhận lại mật không được để trống!'
            error = true;
        } else if (confirmPassword.length < 6) {
            errorForm.confirmPassword = 'Xác nhận lại mật phải có ít nhất 6 kí tự!'
            error = true;
        } else if (password !== confirmPassword) {
            errorForm.password = 'Mật khẩu không trùng khớp!';
            errorForm.confirmPassword = 'Mật khẩu không trùng khớp!';
            error = true;
        } else {
            errorForm.confirmPassword = ''
        }

        if (error) {
            dispatch(setErrorRegister(errorForm));
        } else {
            if (!isCheck) {
                error = true
            }
        }
        return error;
    }

    const handleResetError = () => {
        dispatch(setErrorRegister({
            name: '',
            phone: '',
            password: '',
            confirmPassword: '',
        }))
    }


    const handleShowLogin = () => {
        handleResetError();
        props.handleShowFormLogin()
    }

    const handleRegisterAccount = () => {
        if (!validateFormRegister()) {
            let formRegister = {
                name: name,
                phone: phone,
                password: password,
                confirmPassword: confirmPassword
            }
            dispatch(handleRegister(formRegister));
        }
    }

    const onChangeCheckBox = (e) => {
        setIsCheck(e.target.checked);
    }

    return (
        <div className={`sign-up-form ${styles.signUpWrap} ${props.activeSign ? styles.signUpWrapActive : ''}`}>
            <div className={styles.headerWrap}>
                <div className={styles.descriptionWrap}>
                    <p className={styles.title}>Chào mừng trở lại!</p>
                    <p className={styles.content}>Đăng ký</p>
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
                        size="small"
                        className={styles.input}
                        value={name}
                        onChange={(e) => handleChangeInput(e, 'name')}
                        placeholder="Họ và tên"
                    />
                    {
                        errorRegister && errorRegister.name ?
                            <span className={styles.error}><WarningOutlined /> {errorRegister.name}</span> : ''
                    }
                </div>
                <div className={styles.inputWrap}>
                    <Input
                        size="small"
                        className={styles.input}
                        value={phone}
                        onChange={(e) => handleChangeInput(e, 'phone')}
                        placeholder="Số điện thoại (để xác thực tài khoản và đăng nhập)"
                    />
                    {
                        errorRegister && errorRegister.phone ?
                            <span className={styles.error}><WarningOutlined /> {errorRegister.phone}</span> : ''
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
                        errorRegister && errorRegister.password ?
                            <span className={styles.error}><WarningOutlined /> {errorRegister.password}</span> : ''
                    }
                </div>
                <div className={styles.inputWrap}>
                    <Input.Password
                        size="small"
                        value={confirmPassword}
                        onChange={(e) => handleChangeInput(e, 'confirmPassword')}
                        className={`style-input ${styles.input}`}
                        placeholder="Nhập lại mật khẩu"
                        visibilityToggle={{
                            visible: confirmPasswordVisible,
                            onVisibleChange: setConfirmPasswordVisible,
                        }}
                    />
                    {
                        errorRegister && errorRegister.confirmPassword ?
                            <span className={styles.error}><WarningOutlined /> {errorRegister.confirmPassword}</span> : ''
                    }
                </div>
                <div className={styles.toolbar}>
                    <Checkbox
                        onChange={onChangeCheckBox}>Đồng ý với các điều khoản
                    </Checkbox>
                </div>

                <div className={styles.buttonWrap}>
                    <Button
                        onClick={() => handleRegisterAccount()}
                        size={'large'}
                        loading={loadingBtnRegister}
                    >Đăng ký</Button>
                </div>
                <p className={styles.textFooter}>Bạn đã có tài khoản hãy <span onClick={() => handleShowLogin()} className={styles.textSignUp}>đăng nhập</span></p>
                <div className={styles.tipWrap}>
                    <span>© 2023 ZentSoft. Được phát triển bởi</span>
                    <HeartOutlined className={styles.icon}/>
                    <span className={styles.name}>Zent</span>
                </div>
            </div>
        </div>
    );
}

export default Register;
