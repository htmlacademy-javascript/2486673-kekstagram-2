

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
