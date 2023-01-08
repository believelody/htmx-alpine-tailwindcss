import express from 'express';
import fetch from 'node-fetch';
const router = express.Router();

export const myProfileTitle = 'My Profile';

router.get('/:id/author-name', async (req, res, next) => {
  try {
    if (!req.params?.id.match(/\d/g).length) {
      throw "id params is not a numeric value";
    }
    const authorRes = await fetch(`${process.env.DUMMY_DATA_URL}/users/${req.params.id}?select=firstName`);
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