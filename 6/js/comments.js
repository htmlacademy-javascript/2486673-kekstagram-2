import { getRandomInteger, getCommentId } from './util.js';
import { AVATAR_NUMBER, NAMES, COMMENTS } from './data.js';

const createComments = () => ({
  id: getCommentId(),
  avatar: `img/avatar-${ getRandomInteger(AVATAR_NUMBER.MIN, AVATAR_NUMBER.MAX)}.svg`,
  name: NAMES[getRandomInteger(0, NAMES.length - 1)],
  message: COMMENTS[getRandomInteger(0, COMMENTS.length - 1)],
});

export { createComments };
