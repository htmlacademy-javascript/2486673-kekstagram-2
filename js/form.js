import { isEscapeKey } from './util.js';

const input = document.querySelector('.img-upload__input');
const uploadForm = document.querySelector('.img-upload__overlay');
const formCloseButton = document.querySelector('.img-upload__cancel');


const openForm = () => {
  uploadForm.classList.remove('hidden');
  document.body.classList.add('modal-open');
  document.addEventListener('keydown', onFormKeydown);
};

const closeForm = () => {
  uploadForm.classList.add('hidden');
  document.body.classList.remove('modal-open');
  input.value = '';
};

input.addEventListener('change', () => {
  openForm();
});

function onFormKeydown(evt) {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    closeForm();
  }
}

formCloseButton.addEventListener('click', closeForm);
