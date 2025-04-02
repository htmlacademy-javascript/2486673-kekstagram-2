const ESCAPE = 'Escape';

const DEBOUNCE_DELAY = 500;

//проверка нажатой клавиши

const isEscapeKey = (evt) => evt.key === ESCAPE;


//функция debounce для устранения дребезга:

function debounce (callback, timeoutDelay = DEBOUNCE_DELAY) {
  let timeoutId;

  return (...rest) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => callback.apply(this, rest), timeoutDelay);
  };
}

export { isEscapeKey, debounce };

