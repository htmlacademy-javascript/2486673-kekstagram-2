import { resetSlider, updateSlider } from './image-effects.js';

const FILE_TYPES = ['.jpg', '.jpeg', '.png'];

const fileChooser = document.querySelector('.img-upload__input');
const image = document.querySelector('.img-upload__preview img');

fileChooser.addEventListener('change', () => {
  const file = fileChooser.files[0];
  const fileName = file.name.toLowerCase();

  const matches = FILE_TYPES.some((it) => fileName.endsWith(it));

  if (matches) {
    image.src = URL.createObjectURL(file);
    resetSlider();
    updateSlider();
  }
});
