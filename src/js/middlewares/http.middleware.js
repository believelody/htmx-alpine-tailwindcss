export const numericParamsValidator = (req, res, next) => {
  if (!req.params?.id.match(/[0-9]/g)) {
    throw "id params is not a numeric value";
  }
  next();
}

export const error500Handler = (error, req, res, next) => {
  console.log(error);
  res.status(500).send({ '500': error });
}