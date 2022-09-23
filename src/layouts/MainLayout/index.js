import React, {useEffect} from 'react';
import styles from './styles.module.scss';
import './styles.scss'
import {useDispatch, useSelector} from "react-redux";
import { message } from 'antd';
import {closeToastAlert} from "../../state/modules/app";

const MainLayout = (props) => {
	const messageApp = useSelector(state => state.app.toastAlertPayload);

	const dispatch = useDispatch();
	useEffect(() => {
		if (messageApp.type === "success") {
			message.success(messageApp.message, 3);
			dispatch(closeToastAlert());
		} if (messageApp.type === "error") {
			message.error(messageApp.message, 3);
			dispatch(closeToastAlert());
		}
	}, [messageApp]);
	return (
		<div>
			<header>
				<div>Header</div>
			</header>
			<main>
				{props.children}
			</main>

			<footer>
				<div>Footer</div>
			</footer>
		</div>	
	);
}

export default MainLayout