import express from 'express';
import fetch from 'node-fetch';
const router = express.Router();

router.get('/me', async (req, res, next) => {
  try {
    console.log("user session : ", req.session.user);
    if (!req.session.user) {
      return res.redirect("/login");
    }
    return res.render("pages/user", req.ctx);
  } catch (error) {
    console.log(error);
    next(error);
  }
});

export default router;