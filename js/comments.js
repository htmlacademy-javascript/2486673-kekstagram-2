import { getRandomInteger, getCommentId } from './util.js';
import { AvatarNumber, NAMES, COMMENTS } from './data.js';

const createComments = () => ({
  id: getCommentId(),
  avatar: `img/avatar-${ getRandomInteger(AvatarNumber.MIN, AvatarNumber.MAX)}.svg`,
  name: NAMES[getRandomInteger(0, NAMES.length - 1)],
  message: COMMENTS[getRandomInteger(0, COMMENTS.length - 1)],
});

export { createComments };
