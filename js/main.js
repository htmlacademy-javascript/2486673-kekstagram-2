import { getPhotos } from './photo-description.js';
import { initGallery } from './gallery.js';

import './form.js';
import './validation.js';
import './image-zoom.js';
import './image-effects.js';

initGallery(getPhotos());
