const COMMENTS_NUMBER = 5;

const previewShownComments = document.querySelector('.social__comment-shown-count');
const previewMoreButton = document.querySelector('.comments-loader');
const previewCommentsList = document.querySelector('.social__comments');

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

const addComment = (comments) => {
  comments.forEach((comment) => {
    previewCommentsList.append(getPreviewComments(comment));
  });
};

// скрывает кнопку превью "загрузить еще" если комментариев больше нет

const checkButtonClass = (commentsShown, comments) => {
  previewMoreButton.classList.toggle('hidden',(commentsShown.value >= comments.length));
};

// добавляет заданное число комментариев в список

const addMoreComment = (comments, commentsShown) => {

  const nextComments = comments.slice(commentsShown.value, commentsShown.value + COMMENTS_NUMBER);
  addComment(nextComments);
  commentsShown.value += nextComments.length;

  checkButtonClass(commentsShown, comments);
  previewShownComments.textContent = commentsShown.value;
};


// создает список комментариев для превью

const createCommentsList = (comments) => {
  previewCommentsList.innerHTML = '';

  const commentsShown = {value : 0};

  const onPreviewMoreButtonClick = () => {
    addMoreComment(comments, commentsShown);
  };

  previewMoreButton.addEventListener('click', onPreviewMoreButtonClick);

  onPreviewMoreButtonClick();

};


export { createCommentsList };
