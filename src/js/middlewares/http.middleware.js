export const numericParamsValidator = (req, res, next) => {
  Object.values(req.params).forEach(value => {
    if (!value.match(/[0-9]/g)) {
      throw "id params is not a numeric value";
    }
  });
  next();
}

export const error500Handler = (error, req, res, next) => {
  console.log("error 500 : ", error);
  res.status(500).send({ '500': true });
}

export const error404NotFound = (req, res, next) => {
  return res.status(404).send({ 'not-found': true })
}

export const popupalteCurrentURLInContext = (req, res, next) => {
  if (!req.originalUrl.includes("/api")) {
    req.session.currentURLPathname = req.originalUrl;
    req.ctx = { ...req.ctx, currentURLPathname: `${req.originalUrl}` };
  }
  next();
}