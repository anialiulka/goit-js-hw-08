import throttle from 'lodash.throttle';

const form = document.querySelector('.feedback-form');
let storedItems = JSON.parse(localStorage.getItem('feedback-form-state'));
const data = {
  email: ' ',
  message: ' ',
};

const throttledTime = throttle(onFormInput, 500);

form.addEventListener('input', throttledTime);
form.addEventListener('submit', onFormSubmit);

function storageCheck() {
  if (!storedItems) {
    return;
  } else {
    const { email, message } = storedItems;
    form.elements.email.value = email;
    form.elements.message.value = message;
  }
}

storageCheck();

function onFormInput(e) {
  addToLocalStorage(form);
}

function addToLocalStorage(elements) {
  const { email, message } = elements;
  data.email = email.value;
  data.message = message.value;
  localStorage.setItem('feedback-form-state', JSON.stringify(data));
}

function onFormSubmit(e) {
  addToLocalStorage(e.currentTarget.elements);
  e.preventDefault();
  console.log(JSON.parse(localStorage.getItem('feedback-form-state')));
  localStorage.removeItem('feedback-form-state');
  e.currentTarget.reset();
}
