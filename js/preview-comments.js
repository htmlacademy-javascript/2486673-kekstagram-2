const COMMENTS_NUMBER = 5;

const previewShownComments = document.querySelector('.social__comment-shown-count');
const previewMoreButton = document.querySelector('.comments-loader');
const previewCommentsList = document.querySelector('.social__comments');

let comments = [];
let commentsShown = 0;

//создает элемент комментария

const getPreviewComment = (commentData) => {
  const previewComment = document.createElement('li');
  previewComment.classList.add('social__comment');

  const avatar = document.createElement('img');
  avatar.classList.add('social__picture');
  avatar.src = commentData.avatar;
  avatar.alt = commentData.name;
  avatar.width = 35;
  avatar.height = 35;

  const message = document.createElement('p');
  message.classList.add('social__text');
  message.textContent = commentData.message;

  previewComment.appendChild(avatar);
  previewComment.appendChild(message);

  return previewComment;
};

// добавляет комментарии в список

const addComments = (commentsBlock) => {
  commentsBlock.forEach((comment) => {
    previewCommentsList.append(getPreviewComment(comment));
  });
};

// скрывает кнопку превью "загрузить еще" если комментариев больше нет

const checkButtonClass = () => {
  previewMoreButton.classList.toggle('hidden', commentsShown >= comments.length);
};

// создает список комментариев для превью

const onPreviewMoreButtonClick = () => {

  const nextComments = comments.slice(commentsShown, commentsShown + COMMENTS_NUMBER);
  addComments(nextComments);
  commentsShown += nextComments.length;

  checkButtonClass();
  previewShownComments.textContent = commentsShown;
};

// очищает комментарии и удаляет обработчик

const clearComments = () => {
  commentsShown = 0;
  previewCommentsList.innerHTML = '';
  previewMoreButton.removeEventListener('click', onPreviewMoreButtonClick);
};

// добавляет комментарии по клику

const createCommentsList = (newComments) => {
  clearComments();
  comments = newComments;
  previewMoreButton.addEventListener('click', onPreviewMoreButtonClick);
  onPreviewMoreButtonClick();
};

export { createCommentsList, clearComments };
