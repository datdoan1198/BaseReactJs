import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import styles from './styles.module.scss';
import './styles.scss';
import moment from 'moment';
import { handleGetTimeCountDownFlowDay } from 'utils/helper';

TimeCountdown.propTypes = {
  
};

function TimeCountdown(props) {
  const [day, setDay] = useState('00');
  const [hour, setHour] = useState('00');
  const [minute, setMinute] = useState('00');
  const [second, setSecond] = useState('00');

  const timeCountDown = new Date(moment.utc(props.time)).getTime();

  var countdown = setInterval(function() {
    handleGetTime()
    clearInterval(countdown);
  }, 1000);

  const handleGetTime = () => {
    let now = new Date(moment.utc()).getTime();
    let distance = timeCountDown - now;
    let timeRemaining = handleGetTimeCountDownFlowDay(distance)
    if (distance < 0) {
      setHour('00');
      setMinute('00');
      setSecond('00');
    } else {
      setDay(timeRemaining.days)
      setHour(timeRemaining.hour);
      setMinute(timeRemaining.minute);
      setSecond(timeRemaining.seconds);
    }
  }

  useEffect(() => {
    handleGetTime()
  })

  return (
    <div className={styles.timeCountDownWrap}>
      <div className={`${styles.hoursWrap} ${styles.itemWrap}`}>
        <span>{String(day).slice(0, 1)}</span><span>{String(day).slice(1, 2)}</span> :
        <span className={styles.task}>DAY</span>
      </div>
      <div className={`${styles.hoursWrap} ${styles.itemWrap}`}>
        <span>{String(hour).slice(0, 1)}</span><span>{String(hour).slice(1, 2)}</span> :
        <span className={styles.task}>HR</span>
      </div>
      <div className={`${styles.minuteWrap} ${styles.itemWrap}`}>
        <span>{String(minute).slice(0, 1)}</span><span>{String(minute).slice(1, 2)}</span> :
        <span className={styles.task}>MIN</span>
      </div>
      <div className={`${styles.secondWrap} ${styles.itemWrap}`}>
        <span>{String(second).slice(0, 1)}</span><span>{String(second).slice(1, 2)}</span>
        <span className={styles.task}>SEC</span>
      </div>
    </div>
  );
}

export default TimeCountdown;