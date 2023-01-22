import express from 'express';
import fetch from 'node-fetch';
import { checkUnauthenticatedUserAndRedirect, populateMeInContext } from '../../src/js/middlewares/auth.middleware';
import { numericParamsValidator } from '../../src/js/middlewares/http.middleware';
import { dummyDataURL } from '../../src/js/utils/env.util';
import meRoute from './me';
const router = express.Router();

router.use('/me', checkUnauthenticatedUserAndRedirect, populateMeInContext, meRoute);

router.get('/:id', numericParamsValidator, async (req, res, next) => {
  try {
    const { id } = req.params;
    const userRes = await fetch(`${dummyDataURL}/users/${id}`);
    const userJson = await userRes.json();
    return res.render("pages/user", { ...req.ctx, user: userJson, title: userJson.username });
  } catch (error) {
    console.log(error);
    next(error);
  }
});

router.get('/:id/posts', numericParamsValidator, async (req, res, next) => {
  try {
    const { id } = req.params;
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
      const postsRes = await fetch(`${dummyDataURL}/users/${id}/posts?limit=${limit}&skip=${Number(limit) * (page - 1)}`);
      const postsJson = await postsRes.json();
      const { total } = postsJson;
      const posts = postsJson.posts.map((post, index) => ({
        background: `https://picsum.photos/id/${Math.ceil(Math.random(6) * 100)}/200/300`,
        alt: "content " + (index + 1),
        title: post.title,
        content: post.body,
        views: new Intl.NumberFormat('fr', { notation: "compact" }).format(Math.ceil(Math.random() * 9999 + 1000)),
        comments: post.reactions * Math.ceil(Math.random() * 100 + 10),
        url: `/users/${id}/posts/${post.id}`,
        tags: post.tags,
        id: post.id,
        userId: id,
      }));
      req.ctx = { ...req.ctx, posts, meta: { pages: Math.round(total / Number(limit)), page, limit, total }, title: `${authorJson.username}'s posts` };
    }
    return res.render('pages/user/posts', req.ctx);
  } catch (error) {
    console.log(error);
    next(error);
  }
});

router.get('/:id/posts/:postId', numericParamsValidator, async (req, res, next) => {
  try {
    const { id, postId } = req.params;
    const postsRes = await fetch(`${dummyDataURL}/users/${id}/posts`);
    const { posts } = await postsRes.json();
    const postJson = posts.find((post) => post.id === (Number(postId)));
    const postJsonIndex = posts.findIndex((post) => post.id === postJson?.id);
    const prevPostJson = posts[postJsonIndex - 1];
    const nextPostJson = posts[postJsonIndex + 1];
    const authorRes = await fetch(`${dummyDataURL}/users/${postJson.userId}?select=username,id`);
    const authorJson = await authorRes.json();
    delete postJson.userId;
    const post = { ...postJson, url: { back: `/users/${id}/posts`, prev: `/users/${id}/posts/${prevPostJson?.id}`, next: `/users/${id}/posts/${nextPostJson?.id}` } };
    return res.render('pages/user/posts/id', { ...req.ctx, post, author: authorJson, title: post.title });
  } catch (error) {
    console.log(error);
    next(error);
  }
});

export default router;