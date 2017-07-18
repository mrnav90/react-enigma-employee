import validator from 'validator';
import isEmpty from 'lodash/isEmpty';

export default (data) => {
  const errors = {};
  if (validator.isEmpty(data.company_code)) {
    errors.company_code = 'company_code_blank';
  }
  if (validator.isEmpty(data.employee_code)) {
    errors.employee_code = 'employee_code_blank';
  }
  if (validator.isEmpty(data.employee_password)) {
    errors.password = 'password_blank';
  }
  if (data.employee_password.length < 6) {
    errors.password_short = 'password_short';
  }
  return {
    errors,
    isValid: isEmpty(errors)
  };
};
