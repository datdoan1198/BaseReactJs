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

export const formatMoney = money => {
  return money.toString().replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,");
};

export const isValidEmail = (email) => {
  let result =  false
  if (email && typeof email === 'string') {
    const regex = RegExp(VALIDATE_EMAIL_REGEX);
    result = regex.test(email.trim())
  }
  return result
}

export const isValidPhone = (phone) => {
    let result = false

    if (phone && typeof phone === 'string') {
        let trimPhone = phone.trim()

        if (trimPhone) {
            const regexRule = RegExp(VALIDATE_PHONE_REGEX_RULE);

            let ruleMatchs = trimPhone.match(regexRule);

            if (ruleMatchs && ruleMatchs.length > 0) {
                result = (ruleMatchs[0] === trimPhone)
            }
        }
    }

    return result
}
