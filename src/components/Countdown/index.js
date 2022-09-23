import React, {useState, useEffect} from 'react';
import styles from './styles.module.scss'
import moment from 'moment'

const Countdown = ({deadline, visibleDay = false, onFinished = () => {}}) => {

	const [time, setTime] = useState('')
	const [isInitInterval, setIsInitInterval] = useState(false)

	useEffect(() => {
		if (deadline) {
			var x = setInterval(function() {

				var now = moment.utc().valueOf();
				var distance = deadline - now;

				var days = Math.floor(distance / (1000 * 60 * 60 * 24));
				var hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
				var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
				var seconds = Math.floor((distance % (1000 * 60)) / 1000);

				if (visibleDay) {
					setTime(days + ' days ' + hours + "h " + minutes + "m " + seconds + "s ");
				} else {
					setTime(hours + ":" + minutes + ":" + seconds);
				}

				if (distance <= 0) {
					clearInterval(x);
					onFinished()
				}
			}, 1000);
		}

		return function cleanup() {
			clearInterval(x);
		};
	}, [deadline])

	return (
		<span className={styles.countdownWrap}>
			{time}
		</span>
	);
}

export default Countdown
