import express from 'express';
import middlewares from '../../middlewares';
import service from '../../services';
import utils from '../../utils';

const router = express.Router();

export const postsTitle = 'Posts with select pagination';

router.get('/', middlewares.http.limitQueryValidator, (req, res, next) => utils.error.handleHttpError(req, res, next, async () => {
    const limit = Number(req.query.limit || utils.http.limitQueryArray[0]);
    const page = Number(req.query.page) || 1;
    const { posts, total } = await service.post.fetchAll(limit, limit * (page - 1), '/posts-1');
    return res.render('pages/posts-1', { ...req.ctx, posts, meta: { pages: Math.round(total / limit), page, limit, total }, title: postsTitle });
}));

router.get('/:id', middlewares.http.numericParamsValidator, (req, res, next) => utils.error.handleHttpError(req, res, next, async () => {
    const { id } = req.params;
    const { post, prevPost, nextPost, author } = await service.post.fetchById(Number(id));
    const { user } = req.session;
    const liked = user?.likedPosts?.includes(id);
    return res.render('pages/posts-1/id', {
        ...req.ctx,
        post: {
            ...post, liked, reactions: liked ? ++post.reactions : post.reactions,
            url: {
                back: utils.url.retrieveAppropriateBackUrl(req.headers['hx-current-url'], '/posts-1'),
                prev: prevPost.id && `/posts-1/${prevPost.id}`,
                next: nextPost.id && `/posts-1/${nextPost.id}`
            }
        },
        author,
        title: post.title
    });
}))

export default router;