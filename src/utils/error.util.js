const code500 = "Error: something went wrong.";

const handleFetchError = data => {
  if (data.name) {
    console.log({ data });
    throw data.name;
  }
  return data;
}

const handleHttpError = (req, res, next, cb) => {
  try {
    cb(req, res);
  } catch (error) {
    console.log(`In ${req.originalUrl} route : ${error}`);
    next(error);
  }
}

export default { code500, handleFetchError, handleHttpError };