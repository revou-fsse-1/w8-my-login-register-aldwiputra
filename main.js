import { elementsGetter } from './lib/elementsGetter.js';
import { EMAIL_ERROR_MSG, FIRSTNAME_ERROR_MSG, PASSWORD_ERROR_MSG, USERS_KEY } from './lib/consts.js';
import {
  addErrorMessageUI,
  // removeErrorMessageUI,
  addInputsEventListeners,
  validateFirstName,
  validateEmail,
  validatePassword,
  getInputsValue,
  getUsersData,
  clearAllInputs,
  setLoadingButton,
} from './lib/utils.js';

const formInputs = elementsGetter('register');

addInputsEventListeners(formInputs);
formInputs.form.addEventListener('submit', submitHandlerFactory(formInputs));

function submitHandlerFactory(formInputs) {
  return event => {
    event.preventDefault();

    const firstnameValidity = validateFirstName(formInputs.firstname.value);
    const emailValidity = validateEmail(formInputs.email.value);
    const passwordValidity = validatePassword(formInputs.password.value);

    handleErrorOnInitialSubmit(formInputs, firstnameValidity, emailValidity, passwordValidity);

    if (firstnameValidity && emailValidity && passwordValidity) {
      const result = postUserData(formInputs);

      if (!result.success) {
        formInputs.email.setCustomValidity('Email has already been used');
        addErrorMessageUI(formInputs.email, 'Email has already been used');
        setTimeout(() => alert(result.message), 0);
        return;
      }

      setLoadingButton();

      setTimeout(() => {
        clearAllInputs(formInputs);
        document.cookie = `createdAccount=${result.email}; max-age=5; path=/`;
        window.location.pathname = `/login`;
      }, 2000);
    }
  };
}

function handleErrorOnInitialSubmit(formInputs, firstnameValidity, emailValidity, passwordValidity) {
  if (!firstnameValidity) {
    formInputs.firstname.setCustomValidity(FIRSTNAME_ERROR_MSG);
    addErrorMessageUI(formInputs.firstname, FIRSTNAME_ERROR_MSG);
  }
  if (!emailValidity) {
    formInputs.email.setCustomValidity(EMAIL_ERROR_MSG);
    addErrorMessageUI(formInputs.email, EMAIL_ERROR_MSG);
  }
  if (!passwordValidity) {
    formInputs.password.setCustomValidity(PASSWORD_ERROR_MSG);
    addErrorMessageUI(formInputs.password, PASSWORD_ERROR_MSG);
  }
}

function postUserData(formInputs) {
  const userObject = getInputsValue(formInputs);

  if (!isEmailAvailable(userObject)) {
    return {
      success: false,
      message: 'Email has already been used',
    };
  }

  const users = getUsersData(USERS_KEY);
  users.push(userObject);
  localStorage.setItem(USERS_KEY, JSON.stringify(users));

  return {
    success: true,
    email: userObject.email,
    message: 'User was successfully added',
  };
}

function isEmailAvailable(userObject) {
  const users = getUsersData(USERS_KEY);
  const isEmailUsed = users.find(user => user.email === userObject.email);

  return !Boolean(isEmailUsed);
}
