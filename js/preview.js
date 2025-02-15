import {isEscapeKey} from './util.js';
import {preview, createPreview} from './gallery.js';

const previewCloseButton = document.querySelector('.big-picture__cancel');
// const previewCommentsBlock = preview.querySelector('.social__comment-count');


const openPreview = (pictureData) => {
  preview.classList.remove('hidden');
  createPreview(pictureData);
  document.addEventListener('keydown', onDocumentKeydown);

  document.body.classList.add('modal-open');
};

const closePreview = () => {
  preview.classList.add('hidden');
  document.removeEventListener('keydown', onDocumentKeydown);
  document.body.classList.remove('modal-open');
};

function onDocumentKeydown(evt) {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    closePreview();
  }
}

previewCloseButton.addEventListener('click', closePreview);

export {openPreview};
