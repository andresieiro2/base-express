export default () =>
  (new Date().getTime() *
  Math.abs(Math.floor(Math.random() * (2 - 999) + 2)))
    .toString()
    .substring(0, 9);
