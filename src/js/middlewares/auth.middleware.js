export const setCheckAuthAsHxTrigger = (req, res, next) => {
  if (req.method === "GET" && req.session?.user) {
    console.log(req.headers['hx-current-url']);
    console.log("checkUserSession");
    res.setHeader('HX-Trigger', 'check-auth');
  }
  next();
}

export const checkAuthenticatedUserAndRedirect = (req, res, next) => {
  if (req.session?.user) {
    return res.redirect("/");
  }
  next();
}

export const checkUnauthenticatedUserAndRedirect = (req, res, next) => {
  if (!req.session?.user) {
    if (req.ctx?.fromHTMX) {
      res.setHeader('HX-Push', '/login');
      res.statusCode = 401;
      return res.render("pages/login", { ...req.ctx, title: "Login" });
    } else {
      return res.redirect('/login');
    }
  }
  next();
}