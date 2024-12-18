

const checkLength = (string, maxlength) => (string.length <= maxlength);


const checkPalindrome = (string) => {
  if (!string) {
    return false;
  }
  string = string.replaceAll(' ', '').toLowerCase ();
  let reversedString = '';
  for (let i = string.length - 1; i >= 0; i--) {
    reversedString += string[i];
  }
  return string === reversedString;
};


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
