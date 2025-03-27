const ESCAPE = 'Escape';

const ERROR_DISPLAY_TIME = 5000;

const body = document.body;
const errorTemplate = document.querySelector('#data-error').content.querySelector('.data-error');
const successTemplate = document.querySelector('#success').content.querySelector('.success');
const requestErrorTemplate = document.querySelector('#error').content.querySelector('.error');

// проверка нажатой клавиши

const isEscapeKey = (evt) => evt.key === ESCAPE;

// время отображения ошибки

const setErrorDisplayTime = (element) => {
  body.append(element);

  setTimeout(() => {
    element.remove();
  }, ERROR_DISPLAY_TIME);
};

//ошибка получения данных

const showErrorMessage = () => {
  const errorContainer = errorTemplate.cloneNode(true);
  setErrorDisplayTime(errorContainer);
};

//закрытие окна успешной отправки

const closeSuccessWindow = () => {
  const successElement = document.querySelector('.success');

  successElement.remove();
  document.removeEventListener('keydown', onEscKeydown);
  document.removeEventListener('click', onOutsideClick);
};

const onCloseButtonclick = () => {
  closeSuccessWindow();
};


// открытие окна успешной отправки

const showSuccessMessage = () => {
  const successContainer = successTemplate.cloneNode(true);
  body.append(successContainer);

  const closeButton = successContainer.querySelector('.success__button');
  closeButton.addEventListener('click', onCloseButtonclick);
  document.addEventListener('keydown', onEscKeydown);
  document.addEventListener('click', onOutsideClick);
};

//обработчик закрытия окна успешной отправки по клику вне окна

function onOutsideClick (evt) {
  const successElement = document.querySelector('.success__inner');
  if (successElement !== evt.target) {
    closeSuccessWindow();
  }
}

// обработчик нажатия Escape

function onEscKeydown(evt) {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    closeSuccessWindow();
  }
}

export { showErrorMessage, showSuccessMessage, isEscapeKey };
