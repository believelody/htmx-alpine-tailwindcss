import express from 'express';
import middlewares from '../../../middlewares';
import service from '../../../services';
import utils from '../../../utils';

const router = express.Router();

router.post('/post/:id', middlewares.http.numericParamsValidator, (req, res, next) => utils.error.handleHttpError(req, res, next, async () => {
  const isPostLiked = req.session?.user?.likedPosts?.includes(req.params.id);
  const reactions = isPostLiked ? Number(req.body.reaction) - 1 : Number(req.body.reaction) + 1
  const post = await service.user.me.reactToPost(req.params.id, { reactions });
  if (post.message) {
    throw post.message;
  }
  req.session.user.likedPosts = isPostLiked ? req.session.user.likedPosts.filter(l => l !== req.params.id) : [...req.session.user.likedPosts, req.params.id];
  if (req.cookies["session_remember"]) {
    res.cookie("session_user", req.session.user);
  }
  return res.redirect(new URL(req.headers['hx-current-url']).pathname);
}));

export default router;