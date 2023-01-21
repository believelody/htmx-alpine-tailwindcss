import express from 'express';
import fetch from 'node-fetch';
import { numericParamsValidator } from '../../../src/js/middlewares/http.middleware';
const router = express.Router();

router.post('/post/:id', numericParamsValidator, async (req, res, next) => {
  try {
    const postRes = await fetch(`${process.env.DUMMY_DATA_URL}/posts/${req.params.id}`, {
      method: "put",
      headers: {'Content-Type' : 'application/json' },
      body: JSON.stringify({ reactions: Number(req.body.reaction) + 1 })
    });
    const postJson = await postRes.json();
    const prevPostRes = await fetch(`${process.env.DUMMY_DATA_URL}/posts/${Number(req.params.id) - 1}?select=id`);
    const prevPostJson = await prevPostRes.json();
    const nextPostRes = await fetch(`${process.env.DUMMY_DATA_URL}/posts/${Number(req.params.id) + 1}?select=id`);
    const nextPostJson = await nextPostRes.json();
    const authorRes = await fetch(`${process.env.DUMMY_DATA_URL}/users/${postJson.userId}?select=username`);
    const authorJson = await authorRes.json();
    delete postJson.userId;
    const post = { ...postJson, author: authorJson, prev: prevPostJson.id, next: nextPostJson.id };
    req.ctx = { ...req.ctx, post, liked: true, title: post.title };
    res.render('pages/blog/id', req.ctx);
  } catch (error) {
    console.log(error);
    next(error);
  }
});

export default router;