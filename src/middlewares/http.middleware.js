import utils from "../utils";

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

export const limitQueryValidator = (req, res, next) => {
  if (req.query.limit && !utils.http.limitArray.includes(Number(req.query.limit))) {
    if (req.ctx.fromHTMX) {
      throw "There is a problem with limit value";
    }
    req.ctx.error = utils.error.code500;
    res.statusCode = 500;
  }
  next();
}