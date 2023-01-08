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
    req.session.user = { ...req.ctx.user, ...loginJson, subscribe: false, isAuthenticated: true };
    // if (req.body.remember) {
    //   req.session.remember = true;
    // }
    req.ctx = { ...req.ctx, user: req.session.user };
    res.setHeader('HX-Trigger', 'auth-success');
    res.setHeader('HX-Redirect', '/url');
    return res.status(201);
  } catch (error) {
    console.log(error);
    next(error);
  }
});

router.get('/header', (req, res, next) => {
  console.log("header-auth",req.session.user);
  return res.status(200).send({ isAuthenticated: true });
});

export default router;