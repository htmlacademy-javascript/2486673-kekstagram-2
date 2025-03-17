const form = document.querySelector('.img-upload__form');
const commentInput = form.querySelector('.text__description');

const HASHTAG_AMOUNT = 5;
const COMMENT_LENGTH = 140;

const ErrorMessages = {
  TOO_MANY: 'Нельзя использовать больше 5 хэштегов',
  INVALID_FORMAT: 'Хэштег должен начинаться с # и содержать только буквы и цифры',
  DUPLICATE: 'Хэштеги не должны повторяться',
  TOO_LONG: 'Длина комментария не должна быть больше 140 символов',
};

const hashtagInput = form.querySelector('.text__hashtags');
const hashtagRegex = /^#[a-zа-яё0-9]{1,19}$/i;

const getHashtagsArray = (value) => value.trim().toLowerCase().split(/\s+/);

const hashtagQuantityValidate = (value) => {
  const hashtags = getHashtagsArray(value);
  if (hashtags.length > HASHTAG_AMOUNT) {
    return false;
  }
  return true;
};

const hashtagDuplicateValidate = (value) => {
  const hashtags = getHashtagsArray(value);
  if (new Set(hashtags).size !== hashtags.length) {
    return false;
  }
  return true;
};

const hashtagFormatValidate = (value) => {
  const hashtags = getHashtagsArray(value);
  if (!hashtags.every((hashtag) => hashtagRegex.test(hashtag))) {
    return false;
  }
  return true;
};


// // валидатор комментариев


const commentLengthValidate = (value) => {
  if (value.trim().length > COMMENT_LENGTH) {
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

pristine.addValidator(hashtagInput, hashtagQuantityValidate, ErrorMessages.TOO_MANY);

pristine.addValidator(hashtagInput, hashtagFormatValidate, ErrorMessages.INVALID_FORMAT);

pristine.addValidator(hashtagInput, hashtagDuplicateValidate, ErrorMessages.DUPLICATE);

pristine.addValidator(commentInput, commentLengthValidate, ErrorMessages.TOO_LONG);
