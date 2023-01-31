import express from 'express';
import fetch from 'node-fetch';
import { numericParamsValidator } from '../../../src/js/middlewares/http.middleware';
import { dummyDataURLAuth } from '../../../src/js/utils/env.util';
const router = express.Router();

router.post('/post/:id', numericParamsValidator, async (req, res, next) => {
  try {
    const postRes = await fetch(`${dummyDataURLAuth}/posts/${req.params.id}`, {
      method: "put",
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'Authorization': `Bearer ${req.session.token}`
      },
      body: JSON.stringify({ reactions: Number(req.body.reaction) + 1 })
    });
    const postJson = await postRes.json();
    if (postJson.message) {
      throw postJson.message;
    }
    req.session.user.likedPosts = req.session.user.likedPosts?.includes(req.params.id) ? req.session.user.likedPosts.filter(l => l !== req.params.id) : [...req.session.user.likedPosts, req.params.id ];
    if (req.cookies["session_remember"]) {
      res.cookie("session_user", req.session.user);
    }
    return res.redirect(new URL(req.headers['hx-current-url']).pathname);
  } catch (error) {
    console.log("in /api/reaction/post/" + req.params.id + " : ", error);
    next(error);
  }
});

export default router;