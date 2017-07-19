import validator from 'validator';
import isEmpty from 'lodash/isEmpty';

export default (data, type) => {
  const errors = {};
  if (type === 'email') {
    if (validator.isEmpty(data.company_code)) {
      errors.company_code = 'company_code_blank';
    }
    if (validator.isEmpty(data.email)) {
      errors.email = 'email_blank';
    }
    if (!validator.isEmail(data.email)) {
      errors.email_valid = 'email_valid';
    }
  }
  return {
    errors,
    isValid: isEmpty(errors)
  };
};
