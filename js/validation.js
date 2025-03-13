import { form, commentInput } from './form.js';

const hashtagInput = form.querySelector('.text__hashtags');

const ERROR_MESSAGES = {
  TOO_MANY: 'Нельзя использовать больше 5 хэштегов',
  INVALID_FORMAT: 'Хэштег должен начинаться с # и содержать только буквы и цифры',
  DUPLICATE: 'Хэштеги не должны повторяться',
  TOO_LONG: 'Длина комментария не должна быть больше 140 символов',
};

const HASHTAG_AMOUNT = 5;
const COMMENT_LENGTH = 140;
const hashtagRegex = /^#[a-zа-яё0-9]{1,19}$/i;

let error = '';

const checkAmount = (hashtagArray) => {
  if (hashtagArray.length > HASHTAG_AMOUNT) {
    error = ERROR_MESSAGES.TOO_MANY;
    return false;
  }
  return true;
};


const checkDuplicate = (uniqueHashtags, hashtag) => {
  if (uniqueHashtags.has(hashtag)) {
    error = ERROR_MESSAGES.DUPLICATE;
    return false;
  }
  return true;
};

const checkFormat = (hashtag) => {
  if (!hashtagRegex.test(hashtag)) {
    error = ERROR_MESSAGES.INVALID_FORMAT;
    return false;
  }
  return true;
};

// валидация хештегов

const hashtagValidate = (value) => {
  error = '';
  const hashtagArray = value.trim().toLowerCase().split(/\s+/);
  const uniqueHashtags = new Set();

  if (!value) {
    return true;
  }

  if (!checkAmount(hashtagArray)) {
    return false;
  }

  for (const hashtag of hashtagArray) {

    if (!checkFormat(hashtag) || !checkDuplicate(uniqueHashtags, hashtag)) {
      return false;
    }
    uniqueHashtags.add(hashtag);
  }
  return true;
};

// валидатор комментариев

const checkCommentLength = (value) => {
  if (value.trim().length > COMMENT_LENGTH) {
    error = ERROR_MESSAGES.TOO_LONG;
    return false;
  }
  return true;
};

const commentValidate = (value) => {
  error = '';
  if (!checkCommentLength(value)) {
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
