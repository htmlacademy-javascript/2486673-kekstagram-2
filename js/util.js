const ESCAPE = 'Escape';

const getRandomInteger = (min, max) => {
  const lower = Math.ceil(Math.min(min, max));
  const upper = Math.floor(Math.max(min, max));
  const result = Math.random() * (upper - lower + 1) + lower;
  return Math.floor(result);
};

const getId = () => {
  let currentId = 0;
  return () => ++currentId;
};
const getCommentId = getId();
const getPhotoId = getId();

// Проверка нажатой клавиши

const isEscapeKey = (evt) => evt.key === ESCAPE;

export { getRandomInteger, getCommentId, getPhotoId, isEscapeKey };

