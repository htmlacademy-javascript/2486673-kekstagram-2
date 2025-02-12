import {isEscapeKey} from './util.js';
import {preview, createPreview} from './gallery.js';

const previewCloseButton = document.querySelector('.big-picture__cancel');

const openPreview = (pictureData) => {
  preview.classList.remove('hidden');
  createPreview(pictureData);
  document.addEventListener('keydown', onDocumentKeydown);
};

const closePreview = () => {
  preview.classList.add('hidden');
  document.removeEventListener('keydown', onDocumentKeydown);
  document.body.classList.remove('modal-open');
};

// не использована стрелочная функции для вызова функции до ее объявления

function onDocumentKeydown(evt) {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    closePreview();
  }
}

previewCloseButton.addEventListener('click', closePreview);

export {openPreview};
