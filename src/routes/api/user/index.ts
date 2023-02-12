import express, { NextFunction, Response } from 'express';
import { Request } from '../../../interfaces/http.interface';
import middlewares from '../../../middlewares';
import service from '../../../services';
import utils from '../../../utils';

const router = express.Router();

router.get('/:id/author-name', middlewares.http.numericParamsValidator, (req: Request, res: Response, next: NextFunction) => utils.error.handleHttpError(req, next, async () => {
  const { id } = req.params;
  const author = await service.user.fetchAuthor(Number(id));
  res.render("partials/element/author", { ...req.ctx, author });
}));

export default router;