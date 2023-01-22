import express from 'express';
import fetch from 'node-fetch';
import { dummyDataURL } from '../../../src/js/utils/env.util';
import { homeTitle } from '../../home';
import { myProfileTitle } from '../../user/me';
const router = express.Router();

router.post('/login', async (req, res, next) => {
  try {
    // await new Promise(resolve => setTimeout(resolve, 3000));
    const { email, password } = req.body;
    const loginRes = await fetch(`${dummyDataURL}/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      // body: JSON.stringify({ email, password }),
      body: JSON.stringify({
        username: 'kminchelle',
        password: '0lelplR',
        // expiresInMins: 60, // optional
      }),
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
    res.setHeader('HX-Trigger', 'check-auth');
    if (req.body['stay_on_current_url']) {
      return res.redirect(new URL(req.headers['hx-current-url']).pathname);
    }
    res.setHeader('HX-Push', '/users/me');
    return res.render('pages/user', { ...req.ctx, user: req.session.user, isAuthenticated: true, me: true, title: myProfileTitle });
  } catch (error) {
    console.log(error);
    next(error);
  }
});

router.get('/check', async (req, res, next) => {
  try {
    return res.render(`partials/auth/${req.query.component}`, req.ctx);
  } catch (error) {
    console.log(error);
    next(error);
  }
});

router.post('/logout', async (req, res, next) => {
  try {
    req.session.destroy();
    res.setHeader('HX-Push', '/');
    res.setHeader('HX-Trigger', 'check-auth');
    return res.render('pages/home', { ...req.ctx, isAuthenticated: false, title: homeTitle });
  } catch (error) {
    console.log(error);
    next(error);
  }
});

export default router;