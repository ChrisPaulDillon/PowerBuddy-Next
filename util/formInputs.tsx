export const validateInput = (value: string) => {
  let error;
  if (!value) {
    error = 'Required';
  }
  return error || true;
};

export const validateEmailInput = (value: string) => {
  let error;
  if (!value) {
    error = 'Required';
  } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value)) {
    error = 'Please enter a valid email';
  }
  return error || true;
};

export const validatePassword = (value: string) => {
  let error;
  if (!value) {
    error = 'Password is Required';
  } else if (value.length < 8) {
    error = 'Minimum 8 Characters';
  } else if (!/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/.test(value)) {
    error = 'Must contain one special character & upper case letter';
  }
  return error || true;
};

export const validateDecimalInput = (value: string) => {
  let error;
  if (!value) {
    error = 'Required';
  } else if (!/^\d{1,10}(\.\d{1,4})?$/.test(value)) {
    error = 'Decimal numbers only';
  }
  return error || true;
};
