import { EMAIL_ERROR_MSG, FIRSTNAME_ERROR_MSG, PASSWORD_ERROR_MSG } from './consts.js';

export function validateEmail(value) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

export function validateFirstName(value) {
  return /(.|\s)*\S(.|\s)*/.test(value);
}

export function validatePassword(value) {
  return /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).+$/.test(value);
}

function validatorListener(checker, message) {
  return ({ target }) => {
    if (!checker(target.value)) {
      target.setCustomValidity(message);
      addErrorMessageUI(target, message);
    } else {
      target.setCustomValidity('');
      target.classList.remove('invalid');
      removeErrorMessageUI(target);
    }
  };
}

export function removeErrorMessageUI({ parentElement }) {
  parentElement.removeChild(parentElement.querySelector('.error-msg'));
}

export function addErrorMessageUI({ parentElement }, msg) {
  const checkIfErrorElementExists = parentElement.querySelector('.error-msg');

  if (!checkIfErrorElementExists) {
    const errorElement = document.createElement('span');

    errorElement.textContent = msg;
    errorElement.classList.add('error-msg');

    parentElement.appendChild(errorElement);
  }
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
          'input',
          validatorListener(validatePassword, PASSWORD_ERROR_MSG)
        );
        break;
    }
  }
}
