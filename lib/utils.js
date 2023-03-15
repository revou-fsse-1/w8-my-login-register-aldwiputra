import { EMAIL_ERROR_MSG, FIRSTNAME_ERROR_MSG, PASSWORD_ERROR_MSG } from './consts.js';

function validatorListener(checker, message) {
  return (event) => {
    const value = event.target.value;

    if (!checker(value)) {
      event.target.setCustomValidity(message);

      addErrorMessageUI(event.target, message);
    } else {
      event.target.setCustomValidity('');
      event.target.classList.remove('invalid');

      removeErrorMessageUI(event.target);
    }
  };
}

export function addErrorMessageUI(inputElement, msg) {
  const parentInput = inputElement.parentElement;
  const errEl = parentInput.querySelector('.error-msg');

  if (!errEl) {
    const errorElement = document.createElement('span');

    errorElement.textContent = msg;
    errorElement.classList.add('error-msg');

    parentInput.appendChild(errorElement);
  }
}

export function removeErrorMessageUI(inputElement) {
  inputElement.parentElement.removeChild(document.querySelector('.error-msg'));
}

export function validateEmail(value) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

export function validateFirstName(value) {
  return /(.|\s)*\S(.|\s)*/.test(value);
}

export function validatePassword(value) {
  return /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).+$/.test(value);
}

export function addInputsEventListeners(elementsObj) {
  for (const key in elementsObj) {
    switch (key) {
      case 'firstname':
        elementsObj[key].addEventListener(
          'blur',
          validatorListener(validateFirstName, FIRSTNAME_ERROR_MSG)
        );
        break;
      case 'email':
        elementsObj[key].addEventListener(
          'blur',
          validatorListener(validateEmail, EMAIL_ERROR_MSG)
        );
        break;
      case 'password':
        elementsObj[key].addEventListener(
          'blur',
          validatorListener(validatePassword, PASSWORD_ERROR_MSG)
        );
        break;
    }
  }
}
