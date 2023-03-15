import { elementsGetter } from './lib/elementsGetter.js';
import { EMAIL_ERROR_MSG, FIRSTNAME_ERROR_MSG, PASSWORD_ERROR_MSG } from './lib/consts.js';
import {
  addErrorMessageUI,
  removeErrorMessageUI,
  addInputsEventListeners,
  validateFirstName,
  validateEmail,
  validatePassword,
} from './lib/utils.js';

const formInputs = elementsGetter('register');

addInputsEventListeners(formInputs);
formInputs.form.addEventListener('submit', submitHandlerFactory(formInputs));

function submitHandlerFactory(formInputs) {
  return (event) => {
    event.preventDefault();

    const firstnameValidity = validateFirstName(formInputs.firstname.value);
    const emailValidity = validateEmail(formInputs.email.value);
    const passwordValidity = validatePassword(formInputs.password.value);

    handleErrorOnInitialSubmit(formInputs, firstnameValidity, emailValidity, passwordValidity);

    if (firstnameValidity && emailValidity && passwordValidity) {
    }
  };
}

function handleErrorOnInitialSubmit(
  formInputs,
  firstnameValidity,
  emailValidity,
  passwordValidity
) {
  if (!firstnameValidity) {
    console.log('error');
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
