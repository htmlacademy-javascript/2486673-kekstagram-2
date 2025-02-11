import { openPreview} from './preview';

const template = document.querySelector('#picture').content.querySelector('.picture');
const container = document.querySelector('.pictures');

const preview = document.querySelector('.big-picture');
const previewImg = preview.querySelector('.big-picture__img img');
const previewLikesCount = preview.querySelector('.likes-count');
const previewShownComments = preview.querySelector('.social__comment-shown-count');
const previewCommentsCount = preview.querySelector('.social__comment-total-count');
const previewComments = preview.querySelector('.social__comments');

const fragment = document.createDocumentFragment();
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

  fragment.append(thumbnail);
};

const createThumbnails = (photo) => {
  photosData = photo;
  photo.forEach(createThumbnail);
  container.append(fragment);
};

// создает превью по клику на миниатюру

const createPreview = ({url, likes, comments}) => {
  previewImg.src = url;
  previewLikesCount.textContent = likes;
  previewShownComments.textContent = comments.length;
  previewCommentsCount.textContent = comments.length;
};


container.addEventListener('click', (evt) => {
  const picture = evt.target.closest('.picture');
  if (!picture) {
    return;
  }

  evt.preventDefault();

  const pictureId = Number(picture.dataset.id);
  const pictureData = photosData.find((photo) => photo.id === pictureId);

  openPreview(pictureData);
});

export { createThumbnails, createPreview, preview };
