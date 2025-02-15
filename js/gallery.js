import { openPreview} from './preview';

const template = document.querySelector('#picture').content.querySelector('.picture');
const container = document.querySelector('.pictures');

const preview = document.querySelector('.big-picture');
const previewImg = preview.querySelector('.big-picture__img img');
const previewLikesCount = preview.querySelector('.likes-count');
const previewShownComments = preview.querySelector('.social__comment-shown-count');
const previewCommentsCount = preview.querySelector('.social__comment-total-count');
const previewCommentsList = preview.querySelector('.social__comments');
const previewDescription = preview.querySelector('.social__caption');

const previewCommentsButton = preview.querySelector('.comments-loader');

let photosData = [];

// создает миниатюры из шаблона

const createThumbnail = ({url, description, likes, comments, id}) => {
  const thumbnail = template.cloneNode(true);

  const pictureImage = thumbnail.querySelector('.picture__img');

  pictureImage.src = url;
  pictureImage.alt = description;
  thumbnail.querySelector('.picture__likes').textContent = likes;
  thumbnail.querySelector('.picture__comments').textContent = comments.length ?? 0;
  thumbnail.dataset.id = id;

  container.append(thumbnail);
};

const createThumbnails = (photo) => {
  photosData = photo;
  photo.forEach(createThumbnail);
};

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

const addComment = (comments) => {
  comments.forEach((comment) => {
    previewCommentsList.append(getPreviewComments(comment));
  });
};

const commentsNumber = 5; //вынести в конст

const createCommentsList = (comments) => {
  let commentsShownNumber = 0;

  const loadMoreComments = () => {

    if (comments.length <= commentsNumber){
      comments = comments.slice(0, comments.length);
      previewCommentsButton.classList.add('hidden');
    }

    const nextComments = comments.slice(commentsShownNumber, commentsShownNumber + commentsNumber);
    addComment(nextComments);
    commentsShownNumber += nextComments.length;
  };
  loadMoreComments();

  previewCommentsButton.addEventListener('click', loadMoreComments);

  // if (comments.length <= commentsShownNumber){
  //   previewCommentsButton.classList.add('hidden');
  // }
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


const getPictureData = (clickData) => {
  const pictureId = Number(clickData.dataset.id);
  const pictureData = photosData.find((photo) => photo.id === pictureId);

  openPreview(pictureData);
};

container.addEventListener('click', (evt) => {
  const picture = evt.target.closest('.picture');
  if (!picture) {
    return;
  }

  evt.preventDefault();

  getPictureData(picture);
});


export { createThumbnails, createPreview, preview };
