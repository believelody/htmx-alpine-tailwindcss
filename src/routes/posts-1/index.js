import express from 'express';
import { limitQueryValidator, numericParamsValidator } from '../../middlewares/http.middleware';
import service from '../../services';
import utils from '../../utils';

const router = express.Router();

export const postsTitle = 'Posts with select pagination';

router.get('/', limitQueryValidator, async (req, res, next) => {
    try {
        const limit = Number(req.query.limit || utils.http.limitArray[0]);
        const page = Number(req.query.page) || 1;
        const { posts, total } = await service.post.fetchAll(limit, limit * (page - 1), '/posts-1');
        return res.render('pages/posts-1', { ...req.ctx, posts, meta: { pages: Math.round(total / limit), page, limit, total }, title: postsTitle });
    } catch (error) {
        console.log(`In get ${req.originalUrl} route : `, error);
        next(error);
    }
});

router.get('/:id', numericParamsValidator, async (req, res, next) => {
    try {
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
    } catch (error) {
        console.log(`In get ${req.originalUrl} route : `, error);
        next(error);
    }
})

export default router;