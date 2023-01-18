import express from 'express';
import fetch from 'node-fetch';
const router = express.Router();

router.post('/post/:postId', async (req, res, next) => {
  try {
    console.log(req.body);
    if (!req.params?.postId.match(/\d/g).length) {
      throw "postId params is not a numeric value";
    }
    const postRes = await fetch(`${process.env.DUMMY_DATA_URL}/posts/${req.params.postId}`, {
      method: "put",
      headers: {'Content-Type' : 'application/json' },
      body: JSON.stringify({ reactions: Number(req.body.reaction) + 1 })
    });
    const postJson = await postRes.json();
    const prevPostRes = await fetch(`${process.env.DUMMY_DATA_URL}/posts/${Number(req.params.postId) - 1}?select=id`);
    const prevPostJson = await prevPostRes.json();
    const nextPostRes = await fetch(`${process.env.DUMMY_DATA_URL}/posts/${Number(req.params.postId) + 1}?select=id`);
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