const img = document.querySelector('.img-upload__preview img');
const sliderContainer = document.querySelector('.img-upload__effect-level');
const effectsFieldset = document.querySelector('.img-upload__effects');
const slider = document.querySelector('.effect-level__slider');
const effectValue = document.querySelector('.effect-level__value');

const effectsSettings = {
  chrome: { min: 0, max: 1, step: 0.1, start: 1, filter: 'grayscale', unit: '' },
  sepia: { min: 0, max: 1, step: 0.1, start: 1, filter: 'sepia', unit: '' },
  marvin: { min: 0, max: 100, step: 1, start: 100, filter: 'invert', unit: '%' },
  phobos: { min: 0, max: 3, step: 0.1, start: 3, filter: 'blur', unit: 'px' },
  heat: { min: 1, max: 3, step: 0.1, start: 3, filter: 'brightness', unit: '' },
};

let currentEffect = 'none';

noUiSlider.create(slider, {
  range: { min: 0, max: 100},
  start: 100,
});

const applyEffect = (value) => {
  const effect = effectsSettings[currentEffect];

  if (effect) {
    img.style.filter = `${effect.filter}(${value}${effect.unit})`;
  } else {
    img.style.filter = 'none';
    sliderContainer.classList.add('hidden');
  }
};

const updateSlider = () => {

  const effect = effectsSettings[currentEffect];

  if (!effect) {
    img.style.filter = 'none';
    sliderContainer.classList.add('hidden');
    return;
  }

  sliderContainer.classList.remove('hidden');

  slider.noUiSlider.updateOptions({
    range: { min: effect.min, max: effect.max },
    step: effect.step,
    start: effect.start,
  });
};

slider.noUiSlider.on('update', () => {
  effectValue.value = slider.noUiSlider.get();
  applyEffect(effectValue.value);
});

const onRadioButtonChange = (evt) => {
  if (evt.target.matches('.effects__radio')) {
    currentEffect = evt.target.value;
    updateSlider();
  }
};

effectsFieldset.addEventListener('change', onRadioButtonChange);
