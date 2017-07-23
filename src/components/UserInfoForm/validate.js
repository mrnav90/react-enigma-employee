import validator from 'validator';
import isEmpty from 'lodash/isEmpty';

export default (data) => {
  const errors = {};
  if (validator.isEmpty(data.email)) {
    errors.email = 'email_blank';
  }
  if (!validator.isEmail(data.email)) {
    errors.email_valid = 'email_valid';
  }
  if (validator.isEmpty(data.password)) {
    errors.password = 'password_blank';
  }
  if (data.password.length < 6) {
    errors.password_short = 'password_short';
  }
  if (validator.isEmpty(data.password_confirmation)) {
    errors.password_confirmation = 'password_blank';
  }
  if (data.password_confirmation.length < 6) {
    errors.password_confirmation_short = 'password_short';
  }
  if (!validator.isEmpty(data.password) && !validator.isEmpty(data.password_confirmation) && data.password !== data.password_confirmation) {
    errors.password_not_match = 'password_not_match';
  }
  return {
    errors,
    isValid: isEmpty(errors)
  };
};
