import express from 'express';
import fetch from 'node-fetch';
const router = express.Router();

router.post('/login', async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const loginRes = await fetch(`${process.env.DUMMY_DATA_URL}/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      // body: JSON.stringify({ email, password })
      body: JSON.stringify({
        username: 'kminchelle',
        password: '0lelplR',
        // expiresInMins: 60, // optional
      })
    });
    const loginJson = await loginRes.json();
    if (loginJson.message) {
      return res.status(404).send({ login: loginJson.message });
    }
    res.setHeader('Authorization', `Bearer ${loginJson.token}`);
    // delete loginJson.token;
    req.session.user = { ...req.ctx.user, ...loginJson, subscribe: false };
    // if (req.body.remember) {
    //   req.session.remember = true;
    // }
    res.setHeader('HX-Push', '/users/me');
    res.setHeader('HX-Trigger', 'check-auth');
    return res.render('pages/user', { ...req.ctx, user: req.session.user, isAuthenticated: true });
  } catch (error) {
    console.log(error);
    next(error);
  }
});

router.get('/header', async (req, res, next) => {
  try {
    return res.render('partials/auth/header', req.ctx);
  } catch (error) {
    console.log(error);
    next(error);
  }
});

router.post('/logout', async (req, res, next) => {
  try {
    req.session.destroy();
    res.setHeader('HX-Push', '/about');
    res.setHeader('HX-Trigger', 'check-auth');
    return res.render('pages/about', { ...req.ctx, isAuthenticated: false });
  } catch (error) {
    console.log(error);
    next(error);
  }
});

export default router;