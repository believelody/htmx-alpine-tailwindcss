import express from 'express';
import utils from '../../../utils';
const router = express.Router();

router.get('/update-action', (req, res, next) => utils.error.handleHttpError(req, res, next, () => {
  req.ctx = { ...req.ctx, meta: req.session.meta };
  return res.render("partials/product/action", req.ctx);
}));

export default router;