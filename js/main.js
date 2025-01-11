const DESCRIPTION_AMOUNT = 25;

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

const DESCRIPTION = [
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

const getRandomId = (min, max) => {
  const previosValues = [];

  return function() {
    let currentValue = getRandomInteger(min, max);
    if (previosValues.length >= (max - min + 1)) {
      return null;
    }
    while (previosValues.includes(currentValue)) {
      currentValue = getRandomInteger(min, max);
    }
    previosValues.push(currentValue);
    return currentValue;
  };
};

// randomId внезапно начала отдавать null, якобы соблюдается это условие if (previosValues.length >= (max - min + 1)) {
//   return null, хотя randomCommentsId работает. Не могу разобраться.

const randomId = getRandomId(1, 25);
const randomCommentsId = getRandomId(1, 1000000);

const createComments = () => ({
  id: randomCommentsId(),
  avatar: `img/avatar-${ getRandomInteger(1, 6)}.svg`,
  name: NAMES[getRandomInteger(0, NAMES.length - 1)],
  message: COMMENTS[getRandomInteger(0, COMMENTS.length - 1)],
});


const createPhotoDescription = () => ({
  id: randomId(),
  url: `photos/${randomId()}.jpg`,
  description: DESCRIPTION[getRandomInteger(0, DESCRIPTION.length - 1)],
  likes: getRandomInteger(15, 200),
  comments: Array.from({length: getRandomInteger(1, 30)}, createComments),
});

const getPhotos = () => Array.from({length: DESCRIPTION_AMOUNT}, createPhotoDescription);

getPhotos();
