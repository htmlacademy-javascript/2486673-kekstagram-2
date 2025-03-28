import { sendData } from './api.js';
import { showRequestErrorMessage, showSuccessMessage } from './util.js';
import { closeForm } from './form.js';

const SubmitButtonText = {
  IDLE: 'Сохранить',
  SENDING: 'Сохраняю',
};

const submitButton = document.querySelector('.img-upload__submit');

//блокировка кнопки отправки формы

const disableSubmitButton = () => {
  submitButton.disabled = true;
  submitButton.textContent = SubmitButtonText.SENDING;
};

const enableSubmitButton = () => {
  submitButton.disabled = false;
  submitButton.textContent = SubmitButtonText.IDLE;
};

const sendFormData = (evt) => {
  evt.preventDefault();

  const formData = new FormData(evt.target);
  disableSubmitButton();
  sendData(formData)
    .then(() => {
      showSuccessMessage();
      closeForm();
    })
    .catch(() => {
      showRequestErrorMessage();
    })
    .finally(() => {
      enableSubmitButton();
    });

};

export {sendFormData};
