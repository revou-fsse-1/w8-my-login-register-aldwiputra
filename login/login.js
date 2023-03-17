import { elementsGetter } from '../lib/elementsGetter.js';
import { EMAIL_ERROR_MSG, PASSWORD_ERROR_MSG, USERS_KEY } from '../lib/consts.js';
import {
  addInputsEventListeners,
  validateEmail,
  validatePassword,
  addErrorMessageUI,
  getUsersData,
  getInputsValue,
  setLoadingButton,
  clearAllInputs,
  addAdminUser,
} from '../lib/utils.js';

addAdminUser();

const toast = document.querySelector('.success-toast');
const emailTextElement = document.querySelector('.success-toast .email');
const cookies = document.cookie.split('; ');

if (cookies) {
  for (let i = 0; i < cookies.length; i++) {
    const parts = cookies[i].split('=');
    const name = decodeURIComponent(parts[0]);
    if (name === 'createdAccount') {
      const value = decodeURIComponent(parts[1]);
      emailTextElement.textContent = value;
      toast.classList.add('animate');

      setTimeout(() => {
        toast.classList.remove('animate');
      }, 3000);
      break;
    }
  }
}

const formInputs = elementsGetter('login');
const errorElement = document.querySelector('.error-msg-container');

addInputsEventListeners(formInputs);
formInputs.form.addEventListener('submit', submitHandlerFactory(formInputs));

function submitHandlerFactory(formInputs) {
  return event => {
    event.preventDefault();

    const emailValidity = validateEmail(formInputs.email.value);
    const passwordValidity = validatePassword(formInputs.password.value);

    handleErrorOnInitialSubmit(formInputs, emailValidity, passwordValidity);

    if (emailValidity && passwordValidity) {
      const result = authenticateUser(formInputs);

      if (!result.success) {
        if (errorElement.style.display === '') errorElement.style.display = 'flex';
        errorElement.classList.add('animate');
        setTimeout(() => errorElement.classList.remove('animate'), 500);
      } else {
        if (errorElement.style.display !== '') errorElement.style.display = '';
        localStorage.setItem('loggedInUser', JSON.stringify(result.user));
        setLoadingButton();
        setTimeout(() => {
          clearAllInputs(formInputs);
          window.location.pathname = '/dashboard';
        }, 2000);
      }
    }
  };
}

function authenticateUser(formInputs) {
  const userObject = getInputsValue(formInputs);
  const users = getUsersData(USERS_KEY);
  const auth = users.find(
    user => user.email === userObject.email && user.password === userObject.password
  );

  if (!auth) {
    return {
      success: false,
      message: 'Wrong email or password',
    };
  }

  return {
    success: true,
    message: 'Login success',
    user: auth,
  };
}

function handleErrorOnInitialSubmit(formInputs, emailValidity, passwordValidity) {
  if (!emailValidity) {
    formInputs.email.setCustomValidity(EMAIL_ERROR_MSG);
    addErrorMessageUI(formInputs.email, EMAIL_ERROR_MSG);
  }
  if (!passwordValidity) {
    formInputs.password.setCustomValidity(PASSWORD_ERROR_MSG);
    addErrorMessageUI(formInputs.password, PASSWORD_ERROR_MSG);
  }
}
