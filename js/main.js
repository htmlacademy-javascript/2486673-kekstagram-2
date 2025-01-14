const DESCRIPTION_AMOUNT = 25;

const LIKES = {
  MIN: 15,
  MAX: 200,
};

const AVATAR_NUMBER = {
  MIN: 1,
  MAX: 6,
};

const COMMENTS_NUMBER = {
  MIN: 1,
  MAX: 30,
};

const NAMES = [
  'Иван',
  'Хуан Себастьян',
  'Мария',
  'Кристоф',
  'Виктор',
  'Юлия',
  'Люпита',
  'Вашингтон',
];

const COMMENTS = [
  'В целом всё неплохо. Но не всё.',
  'Всё отлично!',
  'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
  'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
  'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
  'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!',
];

const DESCRIPTIONS = [
  'Жизнь – это коллекция моментов, а не вещей',
  'Пойман в моменте счастья',
  'Когда слова излишни',
  'Создаем воспоминания, которые будут греть сердце',
  'Маленькие радости – большие воспоминания',
  'Сегодняшние мгновения – это завтрашние воспоминания',
  'Просто наслаждаюсь моментом',
  'Всё самое лучшее происходит спонтанно',
  'Остановись и почувствуй магию момента',
];

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

const createComments = () => ({
  id: getCommentId(),
  avatar: `img/avatar-${ getRandomInteger(AVATAR_NUMBER.MIN, AVATAR_NUMBER.MAX)}.svg`,
  name: NAMES[getRandomInteger(0, NAMES.length - 1)],
  message: COMMENTS[getRandomInteger(0, COMMENTS.length - 1)],
});

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

getPhotos();
