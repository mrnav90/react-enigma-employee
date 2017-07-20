import validator from 'validator';
import isEmpty from 'lodash/isEmpty';

export default (data, type) => {
  const errors = {};
  if (validator.isEmpty(data.company_code)) {
    errors.company_code = 'company_code_blank';
  }
  switch (type) {
    case 'email':
      if (validator.isEmpty(data.email)) {
        errors.email = 'email_blank';
      }
      if (!validator.isEmail(data.email)) {
        errors.email_valid = 'email_valid';
      }
      break;
    case 'phone':
      if (validator.isEmpty(data.employee_code)) {
        errors.employee_code = 'employee_code_blank';
      }
      if (validator.isEmpty(data.employee_name)) {
        errors.employee_name = 'name_blank';
      }
      if (validator.isEmpty(data.employee_phone)) {
        errors.employee_phone = 'phone_blank';
      }
      if (!validator.isMobilePhone(data.employee_phone, 'ja-JP')) {
        errors.employee_phone_invalid = 'phone_invalid';
      }
      break;
    default: break;
  }
  return {
    errors,
    isValid: isEmpty(errors)
  };
};
