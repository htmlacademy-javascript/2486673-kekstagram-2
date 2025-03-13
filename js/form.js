import { isEscapeKey } from './util.js';

const form = document.querySelector('.img-upload__form');
const input = form.querySelector('.img-upload__input');
const uploadForm = form.querySelector('.img-upload__overlay');
const formCloseButton = form.querySelector('.img-upload__cancel');
const commentInput = form.querySelector('.text__description');

uploadForm.classList.remove('hidden');//временно

const onUploadInputChange = () => {
  uploadForm.classList.remove('hidden');
  document.body.classList.add('modal-open');
  document.addEventListener('keydown', onFormKeydown);
};

// closeForm это же не просто функция обработчик. разве корректно ее назвать onCloseButtonClick например? ее же вызывает и нажатие escape

const closeForm = () => {
  uploadForm.classList.add('hidden');
  document.body.classList.remove('modal-open');
  form.reset();
};

function onFormKeydown(evt) {
  if (isEscapeKey(evt) && document.activeElement !== commentInput) {
    evt.preventDefault();
    closeForm();
  }
}

input.addEventListener('change', onUploadInputChange);

formCloseButton.addEventListener('click', closeForm);

export { form, commentInput };
