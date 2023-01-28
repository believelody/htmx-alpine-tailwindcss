export const populateUserSessionInContext = async (req, res, next) => {
  let user = req.cookies["session_user"];
  req.session.user = user ?? req.session?.user;
  if (req.session?.user) {
    req.ctx = { ...req.ctx, user: req.session.user, isAuthenticated: !!req.session.user };
  }
  next();
}