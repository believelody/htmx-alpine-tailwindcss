import express, { NextFunction, Response } from "express";
import { Request } from '../../interfaces/http.interface';
import { ProductResponse } from '../../interfaces/product.interface';
import middlewares from '../../middlewares';
import service from '../../services';
import utils from '../../utils';

const router = express.Router();

export const productsTitle = 'Products';

router.get('/', middlewares.http.limitQueryValidator, (req: Request, res: Response, next: NextFunction) => utils.error.handleHttpError(req, next, async () => {
  const limit = Number(req.query.limit || utils.http.limitQueryArray[0]);
  const count = Number(req.query.count || limit);
  if (req.query.count && req.ctx?.fromHTMX) {
    const { products, total } = await service.product.fetchAll(limit, count - limit) as ProductResponse;
    if (req.session) {
      req.session.meta = { total, limit, count };
    }
    res.setHeader('HX-Trigger', 'update-context');
    return res.render('partials/product/list', { ...req.ctx, meta: { total, limit, count }, products });
  }
  const { products, total } = await service.product.fetchAll(count, 0) as ProductResponse;
  return res.render('pages/product', { ...req.ctx, products, meta: { total, limit, count }, title: productsTitle });
}));

export default router;