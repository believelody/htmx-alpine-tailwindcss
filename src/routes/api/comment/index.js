import express from 'express';
import middlewares from '../../../middlewares';
import service from '../../../services';
import utils from '../../../utils';

const router = express.Router();

router.get('/post/:id', middlewares.http.numericParamsValidator, (req, res, next) => utils.error.handleHttpError(req, res, next, async () => {
  // await new Promise(resolve => setTimeout(resolve, 3000));
  const { comments, total, limit } = await service.post.fetchPostComments(req.params.id);
  return res.render("partials/comment/list", { ...req.ctx, postId: req.params.id, comments, meta: { total, limit } });
}));

router.post('/post', (req, res, next) => utils.error.handleHttpError(req, res, next, async () => {
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
}));

export default router;