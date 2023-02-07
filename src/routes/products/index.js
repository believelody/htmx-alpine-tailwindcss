import express from 'express';
import middlewares from '../../middlewares';
import service from '../../services';
import utils from '../../utils';

const router = express.Router();

export const productsTitle = 'Products';

router.get('/', middlewares.http.limitQueryValidator, (req, res, next) => utils.error.handleHttpError(req, res, next, async () => {
  const limit = Number(req.query.limit || utils.http.limitQueryArray[0]);
  const count = Number(req.query.count || limit);
  if (req.query.count && req.ctx.fromHTMX) {
    const { products, total } = await service.product.fetchAll(limit, count - limit);
    req.ctx = { ...req.ctx, meta: { total, limit, count } };
    req.session.meta = { total, limit, count };
    res.setHeader('HX-Trigger', 'update-context');
    return res.render('partials/product/list', { ...req.ctx, products });
  }
  const { products, total } = await service.product.fetchAll(count, 0);
  return res.render('pages/product', { ...req.ctx, products, meta: { total, limit, count }, title: productsTitle });
}));

export default router;