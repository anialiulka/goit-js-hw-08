import throttle from 'lodash.throttle';

const form = document.querySelector('.feedback-form');
const storedItems = JSON.parse(localStorage.getItem('feedback-form-state'));

const throttledTime = throttle(onFormInput, 500);

form.addEventListener('input', throttledTime);
form.addEventListener('submit', onFormSubmit);

function storageCheck() {
  if (!storedItems) {
    console.log('local storage is empty');
    return;
  } else {
    const { email, message } = storedItems;
    form.elements.email.value = email;
    form.elements.message.value = message;
  }
}

storageCheck();

function onFormInput(e) {
  const { email, message } = e.currentTarget.elements;
  const data = {
    email: email.value,
    message: message.value,
  };
  localStorage.setItem('feedback-form-state', JSON.stringify(data));
}

function onFormSubmit(e) {
  e.preventDefault();
  console.log(storedItems);
  localStorage.removeItem('feedback-form-state');
}
