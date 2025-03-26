const ESCAPE = 'Escape';

const ERROR_DISPLAY_TIME = 5000;

const body = document.body;
const errorTemplate = document.querySelector('#data-error').content.querySelector('.data-error');


// Проверка нажатой клавиши

const isEscapeKey = (evt) => evt.key === ESCAPE;

export { isEscapeKey };

//время отображения ошибки

const setErrorDisplayTime = (element) => {
  body.append(element);

  setTimeout(() => {
    element.remove();
  }, ERROR_DISPLAY_TIME);
};

//

const showErrorMessage = (error) => {
  const errorContainer = errorTemplate.cloneNode(true);
  const errorMessage = errorContainer.querySelector('.data-error__title');
  errorMessage.textContent = error;
  setErrorDisplayTime(errorContainer);
};


export { showErrorMessage };
