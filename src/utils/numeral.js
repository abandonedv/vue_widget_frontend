export default (num, words) => {
  let word = words[0];

  if ((num < 10 || num > 19) && num % 10 !== 0) {
    if (num % 10 === 1) {
      word = words[1];
    } else {
      word = num % 10 < 5 ? words[2] : words[0];
    }
  }

  return `${num} ${word}`;
};
