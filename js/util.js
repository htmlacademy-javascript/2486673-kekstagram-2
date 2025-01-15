
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

export { getRandomInteger, getCommentId, getPhotoId };

