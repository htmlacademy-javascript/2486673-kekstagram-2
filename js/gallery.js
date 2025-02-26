import { openPreview } from './preview.js';

const template = document.querySelector('#picture').content.querySelector('.picture');
const container = document.querySelector('.pictures');

// создает миниатюру

const createThumbnail = ({url, description, likes, comments, id}) => {
  const thumbnail = template.cloneNode(true);

  const thumbnailImage = thumbnail.querySelector('.picture__img');

  thumbnailImage.src = url;
  thumbnailImage.alt = description;
  thumbnail.querySelector('.picture__likes').textContent = likes;
  thumbnail.querySelector('.picture__comments').textContent = comments.length ?? 0;
  thumbnail.dataset.id = id;

  return thumbnail;
};

// создает блок миниатюр

const renderThumbnails = (photosArray) => {
  photosArray.forEach((photo) => {
    container.append(createThumbnail(photo));
  });
};

// находит в массиве данные нажатой миниатюры

const findPhotoById = (selectedThumbnail, photosArray) => {
  const thumbnailId = Number(selectedThumbnail.dataset.id);

  return photosArray.find((photo) => photo.id === thumbnailId);
};

// передает данные нажатой миниатюры

const getSelectedThumbnailData = (photosArray) => {
  container.addEventListener('click', (evt) => {
    const selectedThumbnail = evt.target.closest('.picture');
    if (!selectedThumbnail) {
      return;
    }

    evt.preventDefault();

    const selectedThumbnailData = findPhotoById(selectedThumbnail, photosArray);
    openPreview(selectedThumbnailData);
  });

};

// передает исходные данные

const initGallery = (photosArray) => {

  renderThumbnails(photosArray);
  getSelectedThumbnailData(photosArray);
};

export { initGallery };
