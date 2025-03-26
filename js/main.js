import { showErrorMessage } from './util.js';
import { getData } from './api.js';
import { initGallery } from './gallery.js';


import './form.js';
import './validation.js';
import './image-zoom.js';
import './image-effects.js';
import './api.js';


getData()
  .then((data) => {
    initGallery(data);
  })
  .catch((error) => {
    showErrorMessage(error);
  });
