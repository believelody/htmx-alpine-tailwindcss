import express, { NextFunction, Response } from 'express';
import { Request } from '../../../interfaces/http.interface';
import middlewares from '../../../middlewares';
import service from '../../../services';
import utils from '../../../utils';

const router = express.Router();

export const myProfileTitle = 'My Profile';
export const myProfilePostsTitle = 'My Posts';
export const myProfileTodosTitle = 'My Todos';

router.get('/', async (req: Request, res: Response, next: NextFunction) => utils.error.handleHttpError(req, next, () => {
  return res.render("pages/user", { ...req.ctx, title: myProfileTitle });
}));

router.get('/posts', middlewares.http.limitQueryValidator, (req: Request, res: Response, next: NextFunction) => utils.error.handleHttpError(req, next, async () => {
  const limit = Number(req.query.limit || utils.http.limitQueryArray[0]);
  const page = Number(req.query.page) || 1;
  const user = req.ctx?.user;
  if (!user) {
    throw new Error("Error route /me/posts: user is null");
  }
  const { posts, total } = await service.user.me.fetchPosts(user.id, limit, limit * (page - 1));
  return res.render("pages/posts-2", {
		...req.ctx,
		posts,
		meta: { pages: Math.round(total / Number(limit)), page, limit, total },
		title: myProfilePostsTitle,
	});
}));

router.get('/posts/:id', middlewares.http.numericParamsValidator, (req: Request, res: Response, next: NextFunction) => utils.error.handleHttpError(req, next, async () => {
  const { id } = req.params;
  const user = req.ctx?.user;
	if (!user) {
		throw new Error("Error route /me/post:id: user is null");
	}
  const { author, nextPost, post, prevPost } = await service.user.me.fetchPostById(user.id, Number(id));
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
}));

export default router;