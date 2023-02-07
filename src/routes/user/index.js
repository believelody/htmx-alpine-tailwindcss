import express from 'express';
import { checkUnauthenticatedUserAndRedirect, populateMeInContext } from '../../middlewares/auth.middleware';
import { limitQueryValidator, numericParamsValidator } from '../../middlewares/http.middleware';
import service from '../../services';
import utils from '../../utils';
import meRoute from './me';

const router = express.Router();

router.use('/me', checkUnauthenticatedUserAndRedirect, populateMeInContext, meRoute);

router.get('/:id', numericParamsValidator, async (req, res, next) => {
  try {
    const { id } = req.params;
    const user = await service.user.fetchById(id);
    return res.render("pages/user", { ...req.ctx, user, title: user.username });
  } catch (error) {
    console.log(`In get ${req.originalUrl} route : `, error);
    next(error);
  }
});

router.get('/:id/posts', numericParamsValidator, limitQueryValidator, async (req, res, next) => {
  try {
    const { id } = req.params;
    const limit = Number(req.query.limit || utils.http.limitArray[0]);
    const page = Number(req.query.page) || 1;
    const { posts, total } = await service.user.fetchPosts(id, limit, limit * (page - 1));
    const author = await service.user.fetchAuthor(id);
    req.ctx = { ...req.ctx, posts, meta: { pages: Math.round(total / Number(limit)), page, limit, total }, title: `${author.username}'s posts` };
    return res.render('pages/posts-1', req.ctx);
  } catch (error) {
    console.log(`In get ${req.originalUrl} route : `, error);
    next(error);
  }
});

router.get('/:id/posts/:postId', numericParamsValidator, async (req, res, next) => {
  try {
    const { id, postId } = req.params;
    const { author, nextPost, post, prevPost } = await service.user.fetchPostById(id, Number(postId));
    return res.render('pages/posts-1/id', {
      ...req.ctx,
      post: {
        ...post,
        url:
        {
          back: utils.url.retrieveAppropriateBackUrl(req.headers['hx-current-url'], `/users/${id}/posts`),
          prev: prevPost && `/users/${id}/posts/${prevPost.id}`,
          next: nextPost && `/users/${id}/posts/${nextPost.id}`
        } },
      author,
      title: post.title
    });
  } catch (error) {
    console.log(`In get ${req.originalUrl} route : `, error);
    next(error);
  }
});

export default router;