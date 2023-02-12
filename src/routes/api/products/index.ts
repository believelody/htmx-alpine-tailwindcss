import express, { NextFunction, Response } from 'express';
import { Request } from '../../../interfaces/http.interface';
import utils from '../../../utils';
const router = express.Router();

router.get('/update-action', (req: Request, res: Response, next: NextFunction) => utils.error.handleHttpError(req, next, () => {
  req.ctx = { ...req.ctx, meta: req.session?.meta };
  return res.render("partials/product/action", req.ctx);
}));

export default router;