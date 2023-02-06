import express from 'express';
import { numericParamsValidator } from '../../../src/js/middlewares/http.middleware';
import service from '../../../src/js/services';
const router = express.Router();

router.get('/post/:id', numericParamsValidator, async (req, res, next) => {
  try {
    // await new Promise(resolve => setTimeout(resolve, 3000));
    const { comments, total, limit } = await service.post.fetchPostComments(req.params.id);
    return res.render("partials/comment/list", { ...req.ctx, postId: req.params.id, comments, meta: { total, limit } });
  } catch (error) {
    console.log(error);
    next(error);
  }
});

router.post('/post', async (req, res, next) => {
  try {
    const post = JSON.parse(req.body.post);
    const { userId, comment } = req.body;
    // await new Promise(resolve => setTimeout(resolve, 3000));
    const newComment = await service.user.me.commentPost({
      userId,
      postId: post.id,
      body: comment
    })
    if (newComment.message) {
      throw newComment.message;
    }
    res.setHeader('HX-Trigger', 'add-comment');
    return res.render("partials/form/comment", { ...req.ctx, post });
  } catch (error) {
    console.log(error);
    next(error);
  }
});

export default router;