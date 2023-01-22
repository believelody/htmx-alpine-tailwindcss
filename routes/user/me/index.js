import express from 'express';
import fetch from 'node-fetch';
import { numericParamsValidator } from '../../../src/js/middlewares/http.middleware';
import { dummyDataURL } from '../../../src/js/utils/env.util';
import { retrieveAppropriateBackUrl } from '../../../src/js/utils/url.util';
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

router.get('/posts', async (req, res, next) => {
  try {
    const limitArray = ['6', '18', '30'];
    if (req.query?.limit && !limitArray.includes(req.query.limit)) {
      if (req.ctx.fromHTMX) {
        throw "There is a problem with limit value";
      }
      req.ctx.error = utils.error500;
      res.statusCode = 500;
    } else {
      const limit = req.query.limit || limitArray[0];
      const page = Number(req.query.page) || 1;
      const postsRes = await fetch(`${dummyDataURL}/users/${req.ctx.user.id}/posts?limit=${limit}&skip=${Number(limit) * (page - 1)}`);
      const postsJson = await postsRes.json();
      const { posts, total } = postsJson;
      const postsMap = posts.map((post, index) => ({
        background: `https://picsum.photos/id/${Math.ceil(Math.random(6) * 100)}/200/300`,
        alt: "content " + (index + 1),
        title: post.title,
        content: post.body,
        views: new Intl.NumberFormat('fr', { notation: "compact" }).format(Math.ceil(Math.random() * 9999 + 1000)),
        comments: post.reactions * Math.ceil(Math.random() * 100 + 10),
        url: `/users/me/posts/${post.id}`,
        tags: post.tags,
        id: post.id,
        userId: req.ctx.user.id,
      }));
      req.ctx = { ...req.ctx, posts: postsMap, meta: { pages: Math.round(total / Number(limit)), page, limit, total }, title: myProfilePostsTitle };
    }
    return res.render('pages/posts', req.ctx);
  } catch (error) {
    console.log("In get /users/me/posts route : ", error);
    next(error);
  }
});

router.get('/posts/:id', numericParamsValidator, async (req, res, next) => {
  try {
    const { id } = req.params;
    const postsRes = await fetch(`${dummyDataURL}/users/${req.ctx.user.id}/posts`);
    const { posts } = await postsRes.json();
    const postJson = posts.find((post) => post.id === (Number(id)));
    const postJsonIndex = posts.findIndex((post) => post.id === postJson?.id);
    const prevPostJson = posts[postJsonIndex - 1];
    const nextPostJson = posts[postJsonIndex + 1];
    delete postJson.userId;
    const post = { ...postJson, url: { back: retrieveAppropriateBackUrl(req.headers['hx-current-url'], '/users/me/posts'), prev: `/users/me/posts/${prevPostJson?.id}`, next: `/users/me/posts/${nextPostJson?.id}` }};
    return res.render('pages/posts/id', { ...req.ctx, post, title: post.title });
  } catch (error) {
    console.log("In get /users/me/posts/:id route : ", error);
    next(error);
  }
});

export default router;