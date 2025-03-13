import { getPhotos } from './photo-description.js';
import { initGallery } from './gallery.js';

import './form.js';
import './validation.js';
import './image-editing.js';

initGallery(getPhotos());
