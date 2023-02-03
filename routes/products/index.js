import express from 'express';
import fetch from 'node-fetch';
import { limitQueryValidator } from '../../src/js/middlewares/http.middleware';
import { dummyDataURL } from '../../src/js/utils/env.util';
import { limitArray } from '../../src/js/utils/http.util';
const router = express.Router();

export const productsTitle = 'Products';

router.get('/', limitQueryValidator, async (req, res, next) => {
  try {
    const limit = Number(req.query.limit || limitArray[0]);
    const count = Number(req.query.count || limit);
    let productsRes;
    if (req.query.count) {
      productsRes = await fetch(`${dummyDataURL}/products?limit=${limit}&skip=${count - limit}&select=title,price,rating,category,brand,thumbnail`);
      const { products, total } = await productsRes.json();
      req.ctx = { ...req.ctx, meta: { total, limit, count } };
      req.session.meta = { total, limit, count };
      res.setHeader('HX-Trigger', 'update-context');
      return res.render('partials/product/list', { ...req.ctx, products });
    }
    productsRes = await fetch(`${dummyDataURL}/products?limit=${count}&select=title,price,rating,category,brand,thumbnail`);
    const { products, total } = await productsRes.json();
    return res.render('pages/product', { ...req.ctx, products, meta: { total, limit, count }, title: productsTitle });
  } catch (error) {
    console.log(`In ${req.originalUrl} route`);
    next(error);
  }
});

export default router;