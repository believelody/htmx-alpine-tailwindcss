import express from 'express';
import fetch from 'node-fetch';
const router = express.Router();

router.get('/me', async (req, res, next) => {
  try {
    if (!req.session.user) {
      res.setHeader('HX-Push', '/login');
      return res.render("pages/login");
    }
    return res.render("pages/user", { ...req.ctx, title: "My Profile" });
  } catch (error) {
    console.log(error);
    next(error);
  }
});

export default router;