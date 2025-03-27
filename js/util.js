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

const closeMessage = (element) => {

  element.remove();
  document.removeEventListener('keydown', onEscKeydown);
  document.removeEventListener('click', onOutsideClick);
};

const onCloseButtonclick = (element) => {
  closeMessage(element);
};


// открытие окна сообщения

const showMessage = (type) => {
  const template = type === 'success' ? successTemplate : requestErrorTemplate;
  const messageContainer = template.cloneNode(true);

  body.append(messageContainer);

  const closeButton = messageContainer.querySelector(`.${type}__button`);
  closeButton.addEventListener('click', () => onCloseButtonclick(messageContainer));
  document.addEventListener('keydown', (evt) => onEscKeydown(evt, messageContainer));
  document.addEventListener('click',(evt) => onOutsideClick(evt, messageContainer, type));
};

//обработчик закрытия окна сообщения по клику вне окна

function onOutsideClick (evt, messageContainer, type) {
  const element = messageContainer.querySelector(`.${type}__inner`);
  if (element !== evt.target) {
    closeMessage(messageContainer);
  }
}

// обработчик нажатия Escape

function onEscKeydown(evt, messageContainer) {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    closeMessage(messageContainer);
  }
}

export { showMessage, showErrorMessage, isEscapeKey };
