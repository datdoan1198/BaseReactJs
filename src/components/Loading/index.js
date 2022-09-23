import React from 'react';
import styles from './styles.module.scss'
import './styles.scss'
import {Spin} from 'antd';

const Loading = (props) => {
	return (
		<div className={`${styles.loadingPageWrap} ${props.isAction? styles.actionLoading: ''}`}>
			<div className={styles.loadingBody}>
				<Spin size="large"/>
			</div>
		</div>
	);
}

export default Loading
