import { isEscapeKey } from './util.js';
import { createCommentsList, clearComments } from './preview-comments.js';


const preview = document.querySelector('.big-picture');
const previewImg = preview.querySelector('.big-picture__img img');
const previewLikesCount = preview.querySelector('.likes-count');
const previewCommentsCount = preview.querySelector('.social__comment-total-count');
const previewDescription = preview.querySelector('.social__caption');
const previewCloseButton = document.querySelector('.big-picture__cancel');


// создает превью по клику на миниатюру

const createPreview = ({url, likes, comments, description}) => {
  previewImg.src = url;
  previewLikesCount.textContent = likes;
  previewCommentsCount.textContent = comments.length;
  previewDescription.textContent = description;

  createCommentsList(comments);
};

// Логика открытия превью

const openPreview = (pictureData) => {
  preview.classList.remove('hidden');
  createPreview(pictureData);
  document.addEventListener('keydown', onDocumentKeydown);
  document.body.classList.add('modal-open');
};

// Логика закрытия превью

const closePreview = () => {
  preview.classList.add('hidden');
  document.removeEventListener('keydown', onDocumentKeydown);
  document.body.classList.remove('modal-open');
  clearComments();
};

const onPreviewCloseButtonClick = () => {
  closePreview();
};

// функция закрытия превью по нажатию escape

function onDocumentKeydown(evt) {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    closePreview();
  }
}

// обработчик клика на кнопку закрытия превью

previewCloseButton.addEventListener('click', onPreviewCloseButtonClick);


export { openPreview };
