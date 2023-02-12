import express, { NextFunction, Response } from "express";
import { Request } from '../../../interfaces/http.interface';
import { UserResponse } from '../../../interfaces/user.interface';
import service from '../../../services';
import api from '../../../services/api';
import utils from '../../../utils';
import { homeTitle } from '../../home';
import { myProfileTitle } from '../../user/me';

const router = express.Router();

router.post('/login', (req: Request, res: Response, next: NextFunction) => utils.error.handleHttpError(req, next, async () => {
    // await new Promise(resolve => setTimeout(resolve, 3000));
    let token = "";
    const { email, password } = req.body;
    const loginRes = await service.auth.login({ username: email, password });
    // if (loginRes.message) {
    //   return res.status(404).send({ login: loginRes.message });
    // }
    if (loginRes.token) {
      token = loginRes.token;
    }
    const user: Omit<UserResponse, "token"> = { ...req.ctx?.user, ...loginRes, subscribed: false, likedPosts: [] }
    if (req.session) {
      req.session.token = token;
      req.session.remember = true;
      req.session.user = user;
      req.session.cookie.maxAge = utils.session.sessionMaxAge30Days;
    }
    api.setHeader("Authorization", `Bearer ${token}`)
    if (req.body.remember) {
      res.cookie("session_token", token, { maxAge: utils.session.sessionMaxAge30Days });
      res.cookie("session_user", user, { maxAge: utils.session.sessionMaxAge30Days });
      res.cookie("session_remember", req.body.remember, { maxAge: utils.session.sessionMaxAge30Days });
    }
    res.setHeader('HX-Trigger', 'check-auth');
    if (req.body.stay_on_current_url) {
      return res.redirect(new URL(req.headers['hx-current-url']).pathname);
    }
    res.setHeader('HX-Push', '/users/me');
    return res.render('pages/user', { ...req.ctx, user, isAuthenticated: true, me: true, title: myProfileTitle });
  }));

router.get('/check', async (req: Request, res: Response, next) => utils.error.handleHttpError(req, next, async () => {
  return res.render(`partials/auth/${req.query.component}`, { ...req.ctx, currentURLPathname: req.session?.currentURLPathname });
}));

router.post('/logout', (req: Request, res: Response, next) => utils.error.handleHttpError(req, next, async () => {
  req.session?.destroy(err => {
    if (err) {
      throw err;
    }
  });
  res.clearCookie("session_user");
  res.clearCookie("session_token");
  res.clearCookie("session_remember");
  res.setHeader('HX-Push', '/');
  res.setHeader('HX-Trigger', 'check-auth');
  return res.render('pages/home', { ...req.ctx, isAuthenticated: false, title: homeTitle });
}));

export default router;