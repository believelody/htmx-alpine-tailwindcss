import express from 'express';
import fetch from 'node-fetch';
import { numericParamsValidator } from '../../../src/js/middlewares/http.middleware';
import { dummyDataURL } from '../../../src/js/utils/env.util';
const router = express.Router();

router.get('/:id/author-name', numericParamsValidator, async (req, res, next) => {
  try {
    const authorRes = await fetch(`${dummyDataURL}/users/${req.params.id}?select=username`);
    const authorJson = await authorRes.json();
    req.ctx = {
      ...req.ctx, author: authorJson
    };
    res.render('partials/element/author', req.ctx);
  } catch (error) {
    console.log(error);
    next(error);
  }
});

export default router;