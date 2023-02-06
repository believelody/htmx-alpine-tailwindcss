import express from 'express';
import { numericParamsValidator } from '../../../src/js/middlewares/http.middleware';
import service from '../../../src/js/services';
const router = express.Router();

router.get('/:id/author-name', numericParamsValidator, async (req, res, next) => {
  try {
    const author = await service.user.fetchAuthor(req.params.id)
    req.ctx = {
      ...req.ctx, author
    };
    res.render('partials/element/author', req.ctx);
  } catch (error) {
    console.log(error);
    next(error);
  }
});

export default router;