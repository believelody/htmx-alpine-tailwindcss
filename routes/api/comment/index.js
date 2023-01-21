import fetch from 'node-fetch';
import express from 'express';
import { numericParamsValidator } from '../../../src/js/middlewares/http.middleware';
const router = express.Router();

router.get('/post/:id', numericParamsValidator, async (req, res, next) => {
  try {
    // await new Promise(resolve => setTimeout(resolve, 3000));
    const commentsRes = await fetch(`${process.env.DUMMY_DATA_URL}/comments/post/${req.params.id}`);
    const { comments, total, limit } = await commentsRes.json();
    req.ctx = { ...req.ctx, postId: req.params.id, comments, meta: { total, limit } };
    return res.render("partials/comment/list", req.ctx);
  } catch (error) {
    console.log(error);
    next(error);
  }
});

router.post('/post', async (req, res, next) => {
  try {
    const post = JSON.parse(req.body.post);
    // await new Promise(resolve => setTimeout(resolve, 3000));
    const newCommentRes = await fetch(`${process.env.DUMMY_DATA_URL}/comments/add`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        body: req.body['your-comment'],
        postId: post.id,
        userId: req.body.userId,
      })
    });
    const newCommentJson = await newCommentRes.json();
    if (newCommentJson.message) {
      throw newCommentJson.message;
    }
    res.setHeader('HX-Trigger', 'add-comment');
    return res.render("partials/form/comment", { ...req.ctx, post });
  } catch (error) {
    console.log(error);
    next(error);    
  }
});

export default router;