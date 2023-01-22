import express from 'express';
import fetch from 'node-fetch';
import { numericParamsValidator } from '../../../src/js/middlewares/http.middleware';
import { dummyDataURL } from '../../../src/js/utils/env.util';
const router = express.Router();

router.post('/post/:id', numericParamsValidator, async (req, res, next) => {
  try {
    const postRes = await fetch(`${dummyDataURL}/posts/${req.params.id}`, {
      method: "put",
      headers: {'Content-Type' : 'application/json' },
      body: JSON.stringify({ reactions: Number(req.body.reaction) + 1 })
    });
    const postJson = await postRes.json();
    const prevPostRes = await fetch(`${dummyDataURL}/posts/${Number(req.params.id) - 1}?select=id`);
    const prevPostJson = await prevPostRes.json();
    const nextPostRes = await fetch(`${dummyDataURL}/posts/${Number(req.params.id) + 1}?select=id`);
    const nextPostJson = await nextPostRes.json();
    const authorRes = await fetch(`${dummyDataURL}/users/${postJson.userId}?select=username`);
    const authorJson = await authorRes.json();
    delete postJson.userId;
    const post = { ...postJson, author: authorJson, prev: prevPostJson.id, next: nextPostJson.id };
    res.render('pages/blog/id', { ...req.ctx, post, liked: true, title: post.title });
  } catch (error) {
    console.log(error);
    next(error);
  }
});

export default router;