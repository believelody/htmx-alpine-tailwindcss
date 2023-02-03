import express from 'express';
import fetch from 'node-fetch';
import utils from '../../src/js/utils';
import { dummyDataURL } from '../../src/js/utils/env.util';
const router = express.Router();

export const productsTitle = 'Products';

router.get('/', async (req, res, next) => {
  try {
    const limitArray = [6, 18, 30];
    if (req.query?.limit && !limitArray.includes(Number(req.query.limit))) {
      if (req.ctx.fromHTMX) {
        throw "There is a problem with limit value";
      }
      req.ctx.error = utils.error500;
      res.statusCode = 500;
    } else {
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
    }
  } catch (error) {
    console.log(`In ${req.originalUrl} route`);
    next(error);
  }
});

export default router;