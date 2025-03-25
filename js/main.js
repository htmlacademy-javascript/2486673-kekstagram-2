// import { getPhotos } from './photo-description.js';
import { getData } from './api.js';
import { initGallery } from './gallery.js';

import './form.js';
import './validation.js';
import './image-zoom.js';
import './image-effects.js';
import './api.js';

// initGallery(getPhotos());


getData()
  .then((data) => {
    initGallery(data);
  })
  .catch((error) => {
    console.error('Ошибка:', error);
  });
