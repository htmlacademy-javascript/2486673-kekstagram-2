const MINUTES_IN_HOUR = 60;

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

const getTime = (time) => {
  const [hours, minutes] = time.split(':').map(Number);
  return hours * MINUTES_IN_HOUR + minutes;
};

const isInWorkingTime = function (workStart, workEnd, meetingStart, meetingTime) {
  const workStartInMinute = getTime(workStart);
  const workEndInMinute = getTime(workEnd);
  const meetingStartInMinute = getTime(meetingStart);
  const meetingEnd = meetingStartInMinute + Number(meetingTime);

  return workStartInMinute < meetingStartInMinute && meetingEnd <= workEndInMinute;
};
isInWorkingTime('1:1', '1:1', '1:1', 90);
