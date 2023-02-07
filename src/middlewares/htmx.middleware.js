const checkHTMXRequest = async (req, res, next) => {
  if (req.headers['hx-request']) {
    req.ctx = { ...req.ctx, layout: null, fromHTMX: true };
  }
  // await new Promise(r => setTimeout(r, 2000));
  next();
}

export default { checkHTMXRequest };