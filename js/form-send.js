import { sendData } from './api.js';
import { showSuccessMessage } from './util.js';

const sendFormData = (evt) => {
  evt.preventDefault();

  const formData = new FormData(evt.target);

  sendData(formData)
    .then(() => {
      showSuccessMessage();
    })
    .catch((error) => {
      showSuccessMessage(error);
    });
};

export {sendFormData};
