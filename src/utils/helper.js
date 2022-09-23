import moment from 'moment'
import {notification} from "antd";

export const VALIDATE_EMAIL_REGEX = /^[a-zA-Z0-9][a-zA-Z0-9_.-]{1,}@[a-z0-9]{1,}(\.[a-z0-9]{1,}){1,2}$/
export const VALIDATE_PHONE_REGEX_RULE = /((^0|^84|^\+84|^\(\+84\))+([0-9]{2}))+([0-9]{7}|[0-9]{1}\.[0-9]{3}\.[0-9]{3}|[0-9]{1}-[0-9]{3}-[0-9]{3}|[0-9]{1}\s[0-9]{3}\s[0-9]{3}$)/
export const LIMIT_SIZE_UPLOAD = 10485760;

export const formatNumber = (number) => {
  let result = 0
  if (number) {
    result = new Intl.NumberFormat().format(number);
  }
  return result
};

export const formatWalletAddress = (address) => {
  let result = ''
  if (address) {
    result = `0${address.substr(1, 5)}...${address.substr(-3)}`;
  }
  return result
};

export const formatMoney = money => {
  return money.toString().replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,");
};

export const formatDatetime = date => {
  return moment(date).format('ll');
};

export const getImageUrl = (img) => {
  return process.env.REACT_APP_API_URL + '/' + img
};

export const getIndex = (number) => {
  let result = number;
  if (number < 10) {
    result = '0' + number
  }
  return result
};

export const getNotification = (type, title, content, align = 'topRight') => {
  switch (type) {
    case "success":
      notification.success({
        message: title,
        description: content,
        placement: align,
        duration: 2,
        style: {fontWeight: "normal"}
      });
      break;
    case "error":
      notification.error({
        message: title,
        description: content,
        placement: align,
        duration: 2,
        style: {fontWeight: "normal"}
      });
    break;
    case "warning":
      notification.warning({
        message: title,
        description: content,
        placement: align,
        duration: 2,
        style: {fontWeight: "normal"}
      });
    break;
  }
};

export const VALUE_MAX = '0xffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff';

export const EGG_TYPE  = {
  'Common': 1,
  'Rare': 2,
  'Epic': 3
}

export const FEE  = 0.1;

export const ROUND_ID  = {
  'WHITE_LIST': 1,
  'PUBLIC_ROUND': 2
}

export const handleGetTimeCountDownFlowHour = (distance) => {
  let days = Math.floor(distance / (1000 * 60 * 60 * 24));
    let hour = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60) + (days * 24));
    let minute = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    let seconds = Math.floor((distance % (1000 * 60)) / 1000);
    return hour + "h " + minute + "m " + seconds + "s ";
}

export const handleGetTimeCountDownFlowDay = (distance) => {
  let days = Math.floor(distance / (1000 * 60 * 60 * 24));
  let hour = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  let minute = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
  let seconds = Math.floor((distance % (1000 * 60)) / 1000);
  return {
    days: String(days).length > 1 ? String(days) : '0' + String(days),
    hour: String(hour).length > 1 ? String(hour) : '0' + String(hour),
    minute: String(minute).length > 1 ? String(minute) : '0' + String(minute),
    seconds: String(seconds).length > 1 ? String(seconds) : '0' + String(seconds),
  };
}

export const STATUS_EVENT  = {
  'START_IN': 1,
  'END_IN': 2,
  'ENDED': 3
}

export const TYPE_EVENT  = {
  'PUBLIC': 0,
  'PRIVATE': 1
}

export const isValidEmail = (email) => {
  let result =  false
  if (email && typeof email === 'string') {
    const regex = RegExp(VALIDATE_EMAIL_REGEX);
    result = regex.test(email.trim())
  }
  return result
}
