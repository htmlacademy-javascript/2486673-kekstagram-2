import { initGallery } from './gallery';
import { debounce } from './util';

const Filters = {
  RANDOM: 'filter-random',
  DISCUSSED: 'filter-discussed',
};

const SortingMethod = {
  RANDOM: () => Math.random() - 0.5,
  DISCUSSED: (a, b) => b.comments.length - a.comments.length,
};

const RANDOM_IMAGE_COUNT = 10;
const ACTIVE_BUTTON_CLASS = 'img-filters__button--active';

const imageFilters = document.querySelector('.img-filters');

let images = [];

//применение фильтра

const applyFilter = debounce((id) => {
  let filteredImages = images;

  if (id === Filters.RANDOM) {
    filteredImages = images.toSorted(SortingMethod.RANDOM).slice(0, RANDOM_IMAGE_COUNT);
  }
  if (id === Filters.DISCUSSED) {
    filteredImages = images.toSorted(SortingMethod.DISCUSSED);
  }
  initGallery(filteredImages);
});

//отображение панели фильтров

const showFilters = (data) => {
  images = data;
  initGallery(images);
  imageFilters.classList.remove('img-filters--inactive');
};

imageFilters.addEventListener('click', (evt) => {
  const selectedButton = evt.target.closest('.img-filters__button');
  if (!selectedButton) {
    return;
  }
  const activeButton = document.querySelector(`.${ACTIVE_BUTTON_CLASS}`);
  if (activeButton === selectedButton) {
    return;
  }
  activeButton.classList.remove(ACTIVE_BUTTON_CLASS);
  selectedButton.classList.add(ACTIVE_BUTTON_CLASS);
  applyFilter(selectedButton.id);
});


export { showFilters };
