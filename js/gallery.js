import { openPreview } from './preview.js';

const template = document.querySelector('#picture').content.querySelector('.picture');
const container = document.querySelector('.pictures');

// создает миниатюру

const createThumbnail = ({url, description, likes, comments, id}) => {
  const thumbnail = template.cloneNode(true);

  const pictureImage = thumbnail.querySelector('.picture__img');

  pictureImage.src = url;
  pictureImage.alt = description;
  thumbnail.querySelector('.picture__likes').textContent = likes;
  thumbnail.querySelector('.picture__comments').textContent = comments.length ?? 0;
  thumbnail.dataset.id = id;

  return thumbnail;
};

// создает блок миниатюр

const renderThumbnails = (photos) => {
  photos.forEach((photo) => {
    container.append(createThumbnail(photo));
  });
};

// находит в массиве данные нажатой миниатюры

const getPictureData = (picture, photos) => {
  const pictureId = Number(picture.dataset.id);

  return photos.find((photo) => photo.id === pictureId);
};

// передает данные нажатой миниатюры

const onThumbnailClick = (photo) => {
  container.addEventListener('click', (evt) => {
    const picture = evt.target.closest('.picture');
    if (!picture) {
      return;
    }

    evt.preventDefault();

    const pictureData = getPictureData(picture, photo);
    openPreview(pictureData);
  });

};

// передает исходные данные

const getPhotosData = (photo) => {

  renderThumbnails(photo);
  onThumbnailClick(photo);
};

export { getPhotosData };
