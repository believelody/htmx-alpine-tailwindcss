export const populateUserSessionInContext = async (req, res, next) => {
  let user = req.cookies["session_user"];
  let token = req.cookies["session_token"];
  req.session.user = user ?? req.session?.user;
  req.session.token = token ?? req.session?.token;
  if (req.session?.user) {
    req.ctx = { ...req.ctx, user: req.session.user, isAuthenticated: !!req.session.user };
  }
  next();
}