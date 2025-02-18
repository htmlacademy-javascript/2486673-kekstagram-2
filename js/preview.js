import { isEscapeKey } from './util.js';
// import { getPictureDat } from './gallery.js';

const preview = document.querySelector('.big-picture');
const previewImg = preview.querySelector('.big-picture__img img');
const previewLikesCount = preview.querySelector('.likes-count');
const previewShownComments = preview.querySelector('.social__comment-shown-count');
const previewCommentsCount = preview.querySelector('.social__comment-total-count');
const previewCommentsList = preview.querySelector('.social__comments');
const previewDescription = preview.querySelector('.social__caption');

const previewCommentsButton = preview.querySelector('.comments-loader');
const previewCloseButton = document.querySelector('.big-picture__cancel');
// const previewCommentsBlock = preview.querySelector('.social__comment-count');


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

// логика списка комментариев к превью

const COMMENTS_NUMBER = 5; //вынести в конст

const createCommentsList = (comments) => {
  let commentsShownNumber = 0;

  const loadMoreComments = () => {

    const nextComments = comments.slice(commentsShownNumber, commentsShownNumber + COMMENTS_NUMBER);
    addComment(nextComments);
    commentsShownNumber += nextComments.length;

    if (commentsShownNumber >= comments.length) {
      previewCommentsButton.classList.add('hidden');
    } else {
      previewCommentsButton.classList.remove('hidden');
    }

  };
  previewCommentsButton.addEventListener('click', loadMoreComments); //накапливаются комменты если открыть несколько

  loadMoreComments();
};

// создает превью по клику на миниатюру

const createPreview = ({url, likes, comments, description}) => {
  previewImg.src = url;
  previewLikesCount.textContent = likes;
  previewShownComments.textContent = comments.length;
  previewCommentsCount.textContent = comments.length;
  previewDescription.textContent = description;

  previewCommentsList.innerHTML = '';
  createCommentsList(comments);
};


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

export { openPreview };
