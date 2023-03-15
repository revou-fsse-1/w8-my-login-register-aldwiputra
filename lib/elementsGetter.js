export function elementsGetter(formType) {
  if (formType === 'register') {
    return Object.freeze({
      firstname: document.querySelector('#firstname'),
      email: document.querySelector('#email'),
      password: document.querySelector('#password'),
      form: document.querySelector('.form'),
    });
  }

  if (formType === 'login') {
    return Object.freeze({
      email: document.querySelector('#email'),
      password: document.querySelector('#password'),
      form: document.querySelector('.form'),
    });
  }
}
