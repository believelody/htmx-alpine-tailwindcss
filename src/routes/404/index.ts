import express, { NextFunction, Response } from 'express';
import { Request } from '../../interfaces/http.interface';
import utils from '../../utils';

const router = express.Router();

router.get('/', (req: Request, res: Response, next: NextFunction) => utils.error.handleHttpError(req, res, next, () => {
  res.setHeader('HX-Push', '/404');
  return res.render("pages/404", { ...req.ctx, title: "404 Not Found" });
}));

export default router;