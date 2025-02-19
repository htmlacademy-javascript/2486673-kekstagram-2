import { isEscapeKey } from './util.js';

const COMMENTS_NUMBER = 5; //убрать в data?

const preview = document.querySelector('.big-picture');
const previewImg = preview.querySelector('.big-picture__img img');
const previewLikesCount = preview.querySelector('.likes-count');
const previewShownComments = preview.querySelector('.social__comment-shown-count');
const previewCommentsCount = preview.querySelector('.social__comment-total-count');
const previewCommentsList = preview.querySelector('.social__comments');
const previewDescription = preview.querySelector('.social__caption');

const previewCommentsButton = preview.querySelector('.comments-loader');
const previewCloseButton = document.querySelector('.big-picture__cancel');

// создает блок с комментариями для превью

const getPreviewComments = (commentData) => {
  const previewComment = document.createElement('li');
  previewComment.classList.add('social__comment');

  previewComment.innerHTML = `
  <img
    class="social__picture"
    src="${commentData.avatar}"
    alt="${commentData.name}"
    width="35" height="35">
  <p class="social__text">${commentData.message}</p>`;

  return previewComment;
};

// добавляет комментарии к превью

const addComment = (comments) => {
  comments.forEach((comment) => {
    previewCommentsList.append(getPreviewComments(comment));
  });
};

// скрывает кнопку превью "загрузить еще" если комментариев больше нет

const checkButtonClass = (commentsShown, comments) => {
  previewCommentsButton.classList.toggle('hidden',(commentsShown.value >= comments.length));
};

// добавляет заданное число комментариев в список

const addMoreComment = (comments, commentsShown) => {

  const nextComments = comments.slice(commentsShown.value, commentsShown.value + COMMENTS_NUMBER);
  addComment(nextComments);
  commentsShown.value += nextComments.length;

  checkButtonClass(commentsShown, comments);
  previewShownComments.textContent = commentsShown.value; //полагаю что эта строка должна быть в блоке создания превью
};

// создает список комментариев к превью

const createCommentsList = (comments) => {
  const commentsShown = {value : 0};

  const onMoreCommentsClick = () => {
    addMoreComment(comments, commentsShown);
  };

  previewCommentsButton.addEventListener('click', onMoreCommentsClick); //накапливаются комменты если открыть несколько миниатюр подряд

  onMoreCommentsClick();
};

// создает превью по клику на миниатюру

const createPreview = ({url, likes, comments, description}) => {
  previewImg.src = url;
  previewLikesCount.textContent = likes;
  previewCommentsCount.textContent = comments.length;
  previewDescription.textContent = description;

  previewCommentsList.innerHTML = '';

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
};

// функция закрытия превью по нажатию escape

function onDocumentKeydown(evt) {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    closePreview();
  }
}

// обработчик клика на кнопку закрытия превью

previewCloseButton.addEventListener('click', closePreview);

export { openPreview };
