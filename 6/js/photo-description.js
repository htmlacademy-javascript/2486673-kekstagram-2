import { getRandomInteger, getPhotoId } from './util.js';
import { DESCRIPTIONS, LIKES, COMMENTS_NUMBER, DESCRIPTION_AMOUNT } from './data.js';
import { createComments } from './comments.js';

const createPhotoDescription = () => {
  const id = getPhotoId();
  return {
    id,
    url: `photos/${id}.jpg`,
    description: DESCRIPTIONS[getRandomInteger(0, DESCRIPTIONS.length - 1)],
    likes: getRandomInteger(LIKES.MIN, LIKES.MAX),
    comments: Array.from({length: getRandomInteger(COMMENTS_NUMBER.MIN, COMMENTS_NUMBER.MAX)}, createComments),
  };
};

const getPhotos = () => Array.from({length: DESCRIPTION_AMOUNT}, createPhotoDescription);

export { getPhotos };
