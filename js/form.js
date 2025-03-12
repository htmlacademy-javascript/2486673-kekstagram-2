import { isEscapeKey } from './util.js';

const form = document.querySelector('.img-upload__form');
const input = form.querySelector('.img-upload__input');
const uploadForm = form.querySelector('.img-upload__overlay');
const formCloseButton = form.querySelector('.img-upload__cancel');

const hashtagInput = form.querySelector('.text__hashtags');
const commentInput = form.querySelector('.text__description');


const openForm = () => {
  uploadForm.classList.remove('hidden');
  document.body.classList.add('modal-open');
  document.addEventListener('keydown', onFormKeydown);
};

const closeForm = () => {
  uploadForm.classList.add('hidden');
  document.body.classList.remove('modal-open');
  form.reset();
};

input.addEventListener('change', () => {
  openForm();
});


function onFormKeydown(evt) {
  // if(commentInput.onfocus) {
  //   evt.stopPropagation();
  // }
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    closeForm();
  }
}


formCloseButton.addEventListener('click', closeForm);

// валидация формы. будет вынесена в отдельный модуль

const ERROR_MESSAGES = {
  tooMany: 'Нельзя использовать больше 5 хэштегов',
  invalidFormat: 'Хэштег должен начинаться с # и содержать только буквы и цифры',
  duplicate: 'Хэштеги не должны повторяться',
  tooLong: 'длина комментария не должна быть больше 140 символов',
};

const HASHTAG_AMOUNT = 5;

const COMMENT_LENGTH = 140;

const hashtagRegex = /^#[a-zа-яё0-9]{1,19}$/i;

let error = '';

// вынес функцию отдельно. кода стало больше. Оставлять?

const checkDuplicate = (uniqueHashtags, hashtag) => {
  if (uniqueHashtags.has(hashtag)) {
    error = ERROR_MESSAGES.duplicate;
    return false;
  }
  return true;
};

// валидация хештегов

const hashtagValidate = (value) => {

  const inputValue = value.trim().toLowerCase();
  const hashtagArray = inputValue.split(/\s+/);

  const uniqueHashtags = new Set();

  // проверка пустого поля

  if (!value) {
    return true;
  }

  // проверка количества хештегов

  if (hashtagArray.length > HASHTAG_AMOUNT) {
    error = ERROR_MESSAGES.tooMany;
    return false;
  }

  for (const hashtag of hashtagArray) {

    // проверка допустимых символов

    if (!hashtagRegex.test(hashtag)) {
      error = ERROR_MESSAGES.invalidFormat;
      return false;
    }

    // проверка повторов

    if (!checkDuplicate(uniqueHashtags, hashtag)) {
      return false;
    }

    // if (uniqueHashtags.has(hashtag)) {
    //   error = ERROR_MESSAGES.duplicate;
    //   return false;
    // }

    uniqueHashtags.add(hashtag);
  }
  return true;
};

// валидатор комментариев

const commentValidate = (value) => {
  const commentValue = value.trim();
  if (commentValue.length > COMMENT_LENGTH) {
    error = ERROR_MESSAGES.tooLong;
    return false;
  }
  return true;
};

// настройки валидатора

const pristine = new Pristine(form, {
  classTo: 'img-upload__field-wrapper',
  errorTextParent: 'img-upload__field-wrapper',
  errorTextTag: 'div',
  errorTextClass: 'img-upload__field-wrapper--error'
});

commentInput.addEventListener('input', () => {
  pristine.validate(commentInput);
});

hashtagInput.addEventListener('input', () => {
  pristine.validate(hashtagInput);
});

form.addEventListener('submit', (evt) => {
  if (!pristine.validate()) {
    evt.preventDefault();
  }
});

pristine.addValidator(hashtagInput, hashtagValidate, () => error);

pristine.addValidator(commentInput, commentValidate, () => error);
