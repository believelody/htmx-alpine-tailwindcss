import express from 'express';
import fetch from 'node-fetch';
import utils from '../../src/js/utils';
import { dummyDataURL } from '../../src/js/utils/env.util';
const router = express.Router();

export const productsTitle = 'Products';

router.get('/', async (req, res, next) => {
  try {
    const limitArray = ['6', '18', '30'];
    if (req.query?.limit && !limitArray.includes(req.query.limit)) {
      if (req.ctx.fromHTMX) {
        throw "There is a problem with limit value";
      }
      req.ctx.error = utils.error500;
      res.statusCode = 500;
    } else if (req.query?.skip) {
      if (req.ctx.fromHTMX) {
        throw "There is a problem with skip value";
      }
      req.ctx.error = utils.error500;
      res.statusCode = 500;
    } else {
      const limit = req.query.limit || limitArray[0];
      const skip = req.query.skip || 0;
      const productsRes = await fetch(`${dummyDataURL}/products?limit=${limit}&skip=${skip}&select=title,price,rating,category,brand,thumbnail`);
      const { products, total } = await productsRes.json();
      return res.render('pages/product', { ...req.ctx, products, meta: { total, limit, skip }, title: productsTitle });
    }
  } catch (error) {
    console.log(`In ${req.originalUrl} route`);
    next(error);
  }
});

export default router;