import { sendData } from './api.js';
import { showMessage } from './util.js';

const sendFormData = (evt) => {
  evt.preventDefault();

  const formData = new FormData(evt.target);

  sendData(formData)
    .then(() => {
      showMessage('success');
    })
    .catch(() => {
      showMessage('error');
    });
};

export {sendFormData};
