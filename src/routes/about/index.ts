import express, { NextFunction, Response } from "express";
import { Request } from "../../interfaces/http.interface";
import service from '../../services';
import utils from '../../utils';

const router = express.Router();

router.get('/', (req: Request, res: Response, next: NextFunction) => utils.error.handleHttpError(req, next, async () => {
    const cards = await service.about.fetchAll();
    return res.render("pages/about", { ...req.ctx, cards, title: "About Us" });
}));

export default router;