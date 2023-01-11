export default function (options) {
  console.log(this);
  return options.fn(this);
};