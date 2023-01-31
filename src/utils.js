import _ from 'lodash';

const gendiff = (file1, file2) => {
  const arrOfKeyFile1 = Object.keys(file1);
  const arrOfKeyFile2 = Object.keys(file2);

  const arrOfKeysFile1AndFile2 = _.union(arrOfKeyFile1, arrOfKeyFile2);
  // ['host', 'timeout', 'follow', 'proxy', 'verbose'];
  // console.log(arrOfKeyFile1, arrOfKeyFile2);

  const sortedArrOfKeys = _.sortBy(arrOfKeysFile1AndFile2);

  let result = '';

  sortedArrOfKeys.forEach((key) => {
    if (file1[key] === file2[key]) {
      result += `\n    ${key}: ${file1[key]}`;
    } else if (
      Object.prototype.hasOwnProperty.call(file1, key)
      && Object.prototype.hasOwnProperty.call(file2, key)
    ) {
      result += `\n  - ${key}: ${file1[key]}\n  + ${key}: ${file2[key]}`;
    } else if (Object.prototype.hasOwnProperty.call(file1, key)) {
      result += `\n  - ${key}: ${file1[key]}`;
    } else if (Object.prototype.hasOwnProperty.call(file2, key)) {
      result += `\n  + ${key}: ${file2[key]}`;
    }
  });

  return `{${result}\n}`;
};

export default gendiff;
