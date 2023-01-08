import express from 'express';
const router = express.Router();

router.get('/me', async (req, res, next) => {
  try {
    if (!req.session.user) {
      if (req.ctx.fromHTMX) {
        res.setHeader('HX-Push', '/login');
        res.statusCode = 401;
        return res.render("pages/login", { ...req.ctx, title: "Login" });
      } else {
        return res.redirect('/login');
      }
    }
    return res.render("pages/user", { ...req.ctx, title: "My Profile" });
  } catch (error) {
    console.log(error);
    next(error);
  }
});

export default router;