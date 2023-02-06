import express from 'express';
import { numericParamsValidator } from '../../../middlewares/http.middleware';
import service from '../../../services';

const router = express.Router();

router.post('/post/:id', numericParamsValidator, async (req, res, next) => {
  try {
    const isPostLiked = req.session?.user?.likedPosts?.includes(req.params.id);
    const reactions = isPostLiked ? Number(req.body.reaction) - 1 : Number(req.body.reaction) + 1
    const post = await service.user.me.reactToPost(req.params.id, { reactions });
    if (post.message) {
      throw post.message;
    }
    req.session.user.likedPosts = isPostLiked ? req.session.user.likedPosts.filter(l => l !== req.params.id) : [...req.session.user.likedPosts, req.params.id ];
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