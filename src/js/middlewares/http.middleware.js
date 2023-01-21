export const numericParamsValidator = (req, res, next) => {
  if (!req.params?.id.match(/[0-9]/g)) {
    throw "id params is not a numeric value";
  }
  next();
}