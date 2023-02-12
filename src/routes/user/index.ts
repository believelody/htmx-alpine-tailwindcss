import express, { NextFunction, Response } from 'express';
import { Request } from '../../interfaces/http.interface';
import { PostResponse, PostsBuilderResponse } from '../../interfaces/post.interface';
import { UserResponse } from '../../interfaces/user.interface';
import middlewares from '../../middlewares';
import service from '../../services';
import utils from '../../utils';
import meRoute from './me';

const router = express.Router();

router.use('/me', middlewares.auth.checkUnauthenticatedUserAndRedirect, middlewares.auth.populateMeInContext, meRoute);

router.get('/:id', middlewares.http.numericParamsValidator, (req: Request, res: Response, next: NextFunction) => utils.error.handleHttpError(req, next, async () => {
  const { id } = req.params;
  const user = await service.user.fetchById(Number(id)) as UserResponse;
  return res.render("pages/user", { ...req.ctx, user, title: user.username });
}));

router.get('/:id/posts', middlewares.http.numericParamsValidator, middlewares.http.limitQueryValidator, (req: Request, res: Response, next: NextFunction) => utils.error.handleHttpError(req, next, async () => {
  const id = Number(req.params.id);
  const limit = Number(req.query.limit || utils.http.limitQueryArray[0]);
  const page = Number(req.query.page) || 1;
  const { posts, total } = await service.user.fetchPosts(id, limit, limit * (page - 1)) as PostsBuilderResponse;
  const author = await service.user.fetchAuthor(id);
  return res.render("pages/posts-1", {
		...req.ctx,
		posts,
		meta: { pages: Math.round(total / Number(limit)), page, limit, total },
		title: `${author.username}'s posts`,
	});
}));

router.get('/:id/posts/:postId', middlewares.http.numericParamsValidator, async (req: Request, res: Response, next: NextFunction) => utils.error.handleHttpError(req, next, async () => {
	const { id, postId } = req.params;
	const { author, nextPost, post, prevPost } =
		(await service.user.fetchPostById(
			Number(id),
			Number(postId)
		)) as PostResponse;
	return res.render("pages/posts-1/id", {
		...req.ctx,
		post: {
			...post,
			url: {
				back: utils.url.retrieveAppropriateBackUrl(
					req.headers["hx-current-url"],
					`/users/${id}/posts`
				),
				prev: prevPost && `/users/${id}/posts/${prevPost.id}`,
				next: nextPost && `/users/${id}/posts/${nextPost.id}`,
			},
		},
		author,
		title: post.title,
	});
}));

export default router;