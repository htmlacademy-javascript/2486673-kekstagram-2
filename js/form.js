import { isEscapeKey } from './util.js';

const form = document.querySelector('.img-upload__form');
const input = form.querySelector('.img-upload__input');
const uploadForm = form.querySelector('.img-upload__overlay');
const formCloseButton = form.querySelector('.img-upload__cancel');
const commentInput = form.querySelector('.text__description');

const openForm = () => {
  uploadForm.classList.remove('hidden');
  document.body.classList.add('modal-open');
  document.addEventListener('keydown', onFormKeydown);
};

const closeForm = () => {
  uploadForm.classList.add('hidden');
  document.body.classList.remove('modal-open');
};

const onUploadInputChange = () => {
  openForm();
};

const onFormCloseButtonClick = () => {
  closeForm();
  form.reset();
};

function onFormKeydown(evt) {
  if (isEscapeKey(evt) && document.activeElement !== commentInput) {
    evt.preventDefault();
    closeForm();
  }
}

input.addEventListener('change', onUploadInputChange);

formCloseButton.addEventListener('click', onFormCloseButtonClick);

export { form, commentInput };
