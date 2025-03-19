import { getRandomInteger, getPhotoId } from './util.js';
import { Likes, CommentsNumber, DESCRIPTIONS, DESCRIPTION_AMOUNT } from './data.js';
import { createComments } from './comments.js';

const createPhotoDescription = () => {
  const id = getPhotoId();
  return {
    id,
    url: `photos/${id}.jpg`,
    description: DESCRIPTIONS[getRandomInteger(0, DESCRIPTIONS.length - 1)],
    likes: getRandomInteger(Likes.MIN, Likes.MAX),
    comments: Array.from({length: getRandomInteger(CommentsNumber.MIN, CommentsNumber.MAX)}, createComments),
  };
};

const getPhotos = () => Array.from({length: DESCRIPTION_AMOUNT}, createPhotoDescription);

export { getPhotos };
