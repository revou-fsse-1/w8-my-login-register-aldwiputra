import { EMAIL_ERROR_MSG, FIRSTNAME_ERROR_MSG, PASSWORD_ERROR_MSG, USERS_KEY } from './consts.js';

export function validateEmail(value) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

export function validateFirstName(value) {
  return /(.|\s)*\S(.|\s)*/.test(value);
}

export function validatePassword(value) {
  return /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).+$/.test(value);
}

export function getUsersData(key) {
  const users = localStorage.getItem(key);

  return users === null ? [] : JSON.parse(users);
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
  const elementToDelete = parentElement.querySelector('.error-msg');

  if (elementToDelete) {
    parentElement.removeChild(elementToDelete);
  }
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

export function getInputsValue(formInputs) {
  const objToReturn = {};

  for (const key in formInputs) {
    if (key !== 'form') objToReturn[key] = formInputs[key].value;
  }

  return objToReturn;
}

export function clearAllInputs(formInputs) {
  for (const key in formInputs) {
    if (key !== 'form') formInputs[key].value = '';
  }
}

export function setLoadingButton() {
  const button = document.querySelector('#submit');

  button.style.backgroundColor = 'gray';
  button.style.color = 'white';
  button.value = 'Loading...';
}

export function addAdminUser() {
  const users = localStorage.getItem(USERS_KEY);
  const adminObj = {
    firstname: 'Admin',
    email: 'admin@gmail.com',
    password: 'Admin123',
  };

  if (!users) localStorage.setItem(USERS_KEY, JSON.stringify([adminObj]));
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
        elementsObj[key].addEventListener('blur', validatorListener(validateEmail, EMAIL_ERROR_MSG));
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
