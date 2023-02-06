import express from 'express';
import { limitQueryValidator, numericParamsValidator } from '../../src/js/middlewares/http.middleware';
import { retrieveAppropriateBackUrl } from '../../src/js/utils/url.util';
import { limitArray } from '../../src/js/utils/http.util';
import service from '../../src/js/services';
const router = express.Router();

export const postsTitle = 'Posts with input pagination';

router.get('/', limitQueryValidator, async (req, res, next) => {
    try {
        const limit = Number(req.query.limit || limitArray[0]);
        const page = Number(req.query.page) || 1;
        const { posts, total } = await service.post.fetchAll(limit, limit * (page - 1), '/posts-2');
        return res.render('pages/posts-2', { ...req.ctx, posts, meta: { pages: Math.round(total / limit), page, limit, total }, title: postsTitle });
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
        return res.render('pages/posts-2/id', {
            ...req.ctx,
            post: {
                ...post, liked, reactions: liked ? ++post.reactions : post.reactions,
                url: {
                    back: retrieveAppropriateBackUrl(req.headers['hx-current-url'], '/posts-2'),
                    prev: prevPost.id && `/posts-2/${prevPost.id}`,
                    next: nextPost.id && `/posts-2/${nextPost.id}`
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