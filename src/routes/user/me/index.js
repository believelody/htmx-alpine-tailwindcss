import express from 'express';
import middlewares from '../../../middlewares';
import service from '../../../services';
import utils from '../../../utils';

const router = express.Router();

export const myProfileTitle = 'My Profile';
export const myProfilePostsTitle = 'My Posts';
export const myProfileTodosTitle = 'My Todos';

router.get('/', async (req, res, next) => {
  try {
    return res.render("pages/user", { ...req.ctx, title: myProfileTitle });
  } catch (error) {
    console.log("In get /users/me route : ", error);
    next(error);
  }
});

router.get('/posts', middlewares.http.limitQueryValidator, async (req, res, next) => {
  try {
    const limit = Number(req.query.limit || utils.http.limitQueryArray[0]);
    const page = Number(req.query.page) || 1;
    const { posts, total } = await service.user.fetchPosts(req.ctx.user.id, limit, limit * (page - 1));
    req.ctx = { ...req.ctx, posts, meta: { pages: Math.round(total / Number(limit)), page, limit, total }, title: myProfilePostsTitle };
    return res.render('pages/posts-2', req.ctx);
  } catch (error) {
    console.log("In get /users/me/posts route : ", error);
    next(error);
  }
});

router.get('/posts/:id', middlewares.http.numericParamsValidator, async (req, res, next) => {
  try {
    const { id } = req.params;
    const { author, nextPost, post, prevPost } = await service.user.fetchPostById(req.ctx.user.id, Number(id));
    return res.render('pages/posts-2/id', {
      ...req.ctx,
      post: {
        ...post,
        url:
        {
          back: utils.url.retrieveAppropriateBackUrl(req.headers['hx-current-url'], `/users/${id}/posts`),
          prev: prevPost && `/users/me/posts/${prevPost.id}`,
          next: nextPost && `/users/me/posts/${nextPost.id}`
        }
      },
      author,
      title: post.title
    });
  } catch (error) {
    console.log("In get /users/me/posts/:id route : ", error);
    next(error);
  }
});

export default router;