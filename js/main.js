import { showErrorMessage } from './form-messages.js';
import { getData } from './api.js';
import { showFilters } from './image-filter.js';


import './form.js';
import './validation.js';
import './image-zoom.js';
import './image-effects.js';


getData()
  .then((data) => {
    showFilters(data);
  })
  .catch((error) => {
    showErrorMessage(error);
  });


