import { getPhotos } from './photo-description.js';
import { createThumbnails } from './gallery.js';

createThumbnails(getPhotos());
