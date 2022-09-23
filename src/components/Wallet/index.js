import React, {useState} from 'react';
import {connect, useDispatch, useSelector} from "react-redux";
import { connectWeb3Modal, disconnectWeb3Modal } from 'connections/web3Modal';
import {formatWalletAddress} from "../../utils/helper";
import ButtonLogin from "../../assets/images/ButtonLogin.png";
import ButtonMenu from "../../assets/images/Button/BtnConnect.png";
import styles from '../../components/Wallet/styles.module.scss';
import ModalConnectWallet from '../../components/ModalConnectWallet'
import { resetWalletAddress } from "../../state/modules/app";
import { LoginOutlined } from '@ant-design/icons';
import { removeAuthToken, removeItem } from 'utils/localStorage';
import { goToPage, ROUTE_HOME, ROUTE_MARKETPLACE, ROUTE_STARTER_PACK } from 'state/modules/routing';
import { setIsConnectWallet } from '../../state/modules/app';

const Wallet = (props) => {
  const [visible, setVisible] = useState(false);

  const locationType = useSelector(state => state.location.type)

  const dispatch = useDispatch();

  const openModal = () => {
    setVisible(true);
  };

  const closeModal = () => {
    setVisible(false);
  };

  const connectWallet = async () => {
    await connectWeb3Modal()
  };

  const disconectWallet = async () => {
    dispatch(setIsConnectWallet(false))
    removeAuthToken();
    removeItem('WEB3_CONNECT_CACHED_PROVIDER');
    dispatch(resetWalletAddress())
    await disconnectWeb3Modal()
    if (locationType !== ROUTE_HOME && locationType !== ROUTE_MARKETPLACE && locationType !== ROUTE_STARTER_PACK) {
      dispatch(goToPage(ROUTE_HOME))
    }
  }

  return (
      <div className={`${styles.walletWrap} ${props.center ? styles.walletWrapCenter : ''}`}>
        {
          !props.walletAddress ?
          <a onClick={() => openModal()}><img src={ButtonMenu} alt=""/></a> :
          <div className={`${styles.isWalletAddress}`}>
            <a className={``}>
              <img src={ButtonLogin} alt=""/>
              <span className={styles.stylesWalletAdress}>{formatWalletAddress(props.walletAddress)}</span>
            </a>
            <div onClick={() => disconectWallet()} className={styles.styleLogout}>Logout <LoginOutlined className={styles.icon} color={'#FFFFFF'}  height="25px" width="25px" /></div>
          </div>
        }
        <ModalConnectWallet
            visible={visible}
            onClick={() => closeModal()}
        />
      </div>
  );
};

export default connect(
    state => ({
      walletAddress: state.app.walletAddress
    }),
    {
      //
    }
)(Wallet);
