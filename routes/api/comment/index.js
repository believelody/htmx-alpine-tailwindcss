import fetch from 'node-fetch';
import express from 'express';
const router = express.Router();

router.get('/post/:id', async (req, res, next) => {
  try {
    if (!req.params?.id.match(/[0-9]/g)) {
      throw "id params is not a numeric value";
    }
    // await new Promise(resolve => setTimeout(resolve, 3000));
    const commentsRes = await fetch(`${process.env.DUMMY_DATA_URL}/comments/post/${req.params.id}`);
    const { comments, total, limit } = await commentsRes.json();
    req.ctx = { ...req.ctx, comments, meta: { total, limit } };
    return res.render("partials/comment/list", req.ctx);
  } catch (error) {
    console.log(error);
    next(error);
  }
});

export default router;