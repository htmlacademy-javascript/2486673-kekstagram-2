import { sendFormData } from './form-send.js';

const HASHTAG_AMOUNT = 5;
const COMMENT_LENGTH = 140;
const HASHTAG_REGEX = /^#[a-zа-яё0-9]{1,19}$/i;

const ErrorMessages = {
  TOO_MANY: 'Нельзя использовать больше 5 хэштегов',
  INVALID_FORMAT: 'Хэштег должен начинаться с # и содержать только буквы и цифры',
  DUPLICATE: 'Хэштеги не должны повторяться',
  TOO_LONG: 'Длина комментария не должна быть больше 140 символов',
};

const form = document.querySelector('.img-upload__form');
const commentInput = form.querySelector('.text__description');
const hashtagInput = form.querySelector('.text__hashtags');

const getHashtagsArray = (value) => value.trim().toLowerCase().split(/\s+/).filter(Boolean);

const hashtagQuantityValidate = (value) => {
  const hashtags = getHashtagsArray(value);
  return hashtags.length <= HASHTAG_AMOUNT;
};

const hashtagDuplicateValidate = (value) => {
  const hashtags = getHashtagsArray(value);
  return new Set(hashtags).size === hashtags.length;
};

const hashtagFormatValidate = (value) => {
  const hashtags = getHashtagsArray(value);
  return hashtags.every((hashtag) => HASHTAG_REGEX.test(hashtag));
};

// // валидатор комментариев

const commentLengthValidate = (value) => value.trim().length <= COMMENT_LENGTH;

// настройки валидатора

const pristine = new Pristine(form, {
  classTo: 'img-upload__field-wrapper',
  errorTextParent: 'img-upload__field-wrapper',
  errorTextTag: 'div',
  errorTextClass: 'img-upload__field-wrapper--error'
});

form.addEventListener('submit', (evt) => {
  evt.preventDefault();

  if (pristine.validate()) {
    sendFormData(evt);
  }
});

const resetValidation = () => {
  pristine.reset();
};

pristine.addValidator(hashtagInput, hashtagQuantityValidate, ErrorMessages.TOO_MANY);

pristine.addValidator(hashtagInput, hashtagFormatValidate, ErrorMessages.INVALID_FORMAT);

pristine.addValidator(hashtagInput, hashtagDuplicateValidate, ErrorMessages.DUPLICATE);

pristine.addValidator(commentInput, commentLengthValidate, ErrorMessages.TOO_LONG);

export { resetValidation };
