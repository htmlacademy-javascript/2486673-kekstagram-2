const ESCAPE = 'Escape';

const ERROR_DISPLAY_TIME = 5000;

const body = document.body;
const errorTemplate = document.querySelector('#data-error').content.querySelector('.data-error');
const successTemplate = document.querySelector('#success').content.querySelector('.success');
const requestErrorTemplate = document.querySelector('#error').content.querySelector('.error');

//проверка нажатой клавиши

const isEscapeKey = (evt) => evt.key === ESCAPE;

//время отображения ошибки

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

//закрытие окна сообщения

const closeMessage = () => {
  const messageContainer = document.querySelector('.error, .success');
  messageContainer.remove();
  body.removeEventListener('keydown', onEscKeydown);
  body.removeEventListener('click', onOutsideClick);
};

//открытие сообщения

const showMessage = (template, type) => {
  const messageContainer = template.cloneNode(true);
  body.append(messageContainer);

  const closeButton = messageContainer.querySelector(`.${type}__button`);

  closeButton.addEventListener('click', () => closeMessage(messageContainer));


  body.addEventListener('keydown', onEscKeydown);
  body.addEventListener('click', onOutsideClick);
};

//открытие окна успешной отправки

const showSuccessMessage = () => {
  showMessage(successTemplate, 'success');
};

//открытие окна ошибки запроса

const showRequestErrorMessage = () => {
  showMessage(requestErrorTemplate, 'error');
};

//обработчик клика вне окна

function onOutsideClick (evt) {
  const messageContainer = document.querySelector('.error, .success');
  const messageWindow = messageContainer.querySelector('.success__inner, .error__inner');
  if (messageWindow !== evt.target) {
    closeMessage();
  }
}

//обработчик нажатия Escape

function onEscKeydown (evt) {
  if (isEscapeKey(evt)) {
    evt.stopPropagation();
    evt.preventDefault();
    closeMessage();
  }
}


export { showErrorMessage, showSuccessMessage, showRequestErrorMessage, isEscapeKey };
