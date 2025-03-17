const img = document.querySelector('.img-upload__preview img');

const effectsFieldset = document.querySelector('.img-upload__effects');
const slider = document.querySelector('.effect-level__slider');
const effectValue = document.querySelector('.effect-level__value');


noUiSlider.create(slider, {
  range: {
    min: 0,
    max: 100,
  },
  start: 0,
});

const changeEffect = (currentValue) => {

  img.style.filter = `grayscale(${effectValue.value / 100})`;
};

slider.noUiSlider.on('update', () => {
  effectValue.value = slider.noUiSlider.get();
  const currentValue = effectValue.value;
  changeEffect(currentValue);
});


