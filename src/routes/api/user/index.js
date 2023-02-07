import express from 'express';
import middlewares from '../../../middlewares';
import service from '../../../services';
import utils from '../../../utils';

const router = express.Router();

router.get('/:id/author-name', middlewares.http.numericParamsValidator, (req, res, next) => utils.error.handleHttpError(req, res, next, async () => {
  const author = await service.user.fetchAuthor(req.params.id)
  req.ctx = {
    ...req.ctx, author
  };
  res.render('partials/element/author', req.ctx);
}));

export default router;