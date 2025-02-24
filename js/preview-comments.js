const COMMENTS_NUMBER = 5;

const previewShownComments = document.querySelector('.social__comment-shown-count');
const previewMoreButton = document.querySelector('.comments-loader');
const previewCommentsList = document.querySelector('.social__comments');

let comments = [];
let commentsShown = 0;

// создает элемент комментария

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

// добавляет комментарии в список

const addComment = (commentsBlock) => {
  commentsBlock.forEach((comment) => {
    previewCommentsList.append(getPreviewComments(comment));
  });
};

// скрывает кнопку превью "загрузить еще" если комментариев больше нет

const checkButtonClass = () => {
  previewMoreButton.classList.toggle('hidden',(commentsShown >= comments.length));
};

// создает список комментариев для превью

const renderNextComment = () => {

  const nextComments = comments.slice(commentsShown, commentsShown + COMMENTS_NUMBER);
  addComment(nextComments);
  commentsShown += nextComments.length;

  checkButtonClass();
  previewShownComments.textContent = commentsShown;
};

// очищает комментарии и удаляет обработчик

const clearComments = () => {
  commentsShown = 0;
  previewCommentsList.innerHTML = '';
  previewMoreButton.removeEventListener('click', renderNextComment);
};

// добавляет комментарии по клику

const createCommentsList = (newComments) => {
  clearComments();
  comments = newComments;
  previewMoreButton.addEventListener('click', renderNextComment);
  renderNextComment();
};

export { createCommentsList, clearComments };
