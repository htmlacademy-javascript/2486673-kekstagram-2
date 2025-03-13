
const zoomOut = document.querySelector('.scale__control--smaller');
const zoomIn = document.querySelector('.scale__control--bigger');
const zoomValue = document.querySelector('.scale__control--value');
const img = document.querySelector('.img-upload__preview');
const ZOOM = {
  STEP: 25,
  MIN: 25,
  MAX: 100,
};

const changeZoom = (newValue) => {
  zoomValue.value = `${newValue}%`;
  img.style.transform = `scale(${newValue / 100})`;
};

const onZoomButtonsClick = (event) => {
  let currentValue = parseInt(zoomValue.value, 10);

  if (event.target === zoomIn && currentValue < ZOOM.MAX) {
    currentValue += ZOOM.STEP;
  } else if (event.target === zoomOut && currentValue > ZOOM.MIN) {
    currentValue -= ZOOM.STEP;
  }

  changeZoom(currentValue);
};


zoomIn.addEventListener('click', onZoomButtonsClick);
zoomOut.addEventListener('click', onZoomButtonsClick);
