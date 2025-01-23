

const checkLength = (string, maxlength) => string.length <= maxlength;

checkLength('qwerty', 6);


const checkPalindrome = (string) => {

  string = string.replaceAll(' ', '').toLowerCase();
  let reversedString = '';
  for (let i = string.length - 1; i >= 0; i--) {
    reversedString += string[i];
  }
  return string === reversedString;
};

checkPalindrome('qwerty');

const extractNumber = (string = '') => {
  string = string.toString();
  let result = '';
  for (let i = 0; i < string.length ; i++) {
    if (!Number.isNaN(parseInt(string[i], 10))) {
      result += string[i];
    }
  }

  return result === '' ? NaN : Number(result);
};

extractNumber('qwerty123');

// Задание "функции возвращаются"

// переводим полученное значение часов в минуты, минуты приводим к числу. складываем часы с минутами.

const getTime = (time) => {
  const timeArray = time.split(':').map((string) => +string);
  const timeInMinutes = (timeArray[0] * 60) + timeArray[1];
  return timeInMinutes;
};

const isInWorkingTime = function (workStart, workEnd, meetingStart, meetingTime) {
  const workStartInMinute = getTime(workStart);
  const workEndInMinute = getTime(workEnd);
  const meetingStartInMinute = getTime(meetingStart);
  const meetingEnd = meetingStartInMinute + Number(meetingTime);

  if (workStartInMinute > meetingStartInMinute || workEndInMinute < meetingStartInMinute) {
    return false;
  }
  if (meetingEnd > workEndInMinute) {
    return false;
  }
  return true;
};

isInWorkingTime('8:00', '17:30', '14:00', 90); // true
isInWorkingTime('8:0', '10:0', '8:0', 120); // true
isInWorkingTime('08:00', '14:30', '14:00', 90); // false
isInWorkingTime('14:00', '17:30', '08:0', 90); // false
isInWorkingTime('8:00', '17:30', '08:00', 900); // false
