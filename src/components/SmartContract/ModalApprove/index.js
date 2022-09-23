import React from 'react';
import {Modal, Button} from 'antd';
import "./styles.scss"
import styles from "./styles.module.scss"
import IconSuccess from "../../../assets/images/Icon/Success.png";
import { useSelector} from "react-redux";

const ModalApprove = (props) => {
  const loadingBtnApprove = useSelector(state => state.marketplace.loadingBtnApprove)
  const handleOk = () => {
    props.onClick()
  };

  const handleCancel = () => {
    props.onClick()
  };

  return (
      <div>
        <Modal
            visible={props.visible}
            onOk={handleOk}
            onCancel={handleCancel}
            width={550}
            footer={null}
            className={`modal-approve`}
        >
          <div className={styles.contentWrap}>
            <img className={styles.banner} src={IconSuccess} alt=""/>
            <span className={styles.title}>Approve Smart Contract</span>
            <br/>
            {/* <p>Your approve was successful!</p> */}
            <div className={styles.buttonWrap}>
              <Button 
                className={`${styles.btnCustom}`} 
                type="primary" 
                shape="round" 
                size={'large'}
                loading={loadingBtnApprove}
                onClick={() => props.handleApprove() }
              >
                Approve
              </Button>
            </div>
          </div>
        </Modal>
      </div>
  );
};

export default ModalApprove

