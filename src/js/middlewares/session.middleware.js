export const populateUserSessionInContext = async (req, res, next) => {
  if (req.session?.user) {
    req.ctx = { ...req.ctx, user: req.session.user, isAuthenticated: !!req.session.user };
  }
  next();
}