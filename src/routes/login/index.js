import express from 'express';
import utils from '../../utils';
const router = express.Router();

export const loginTitle = 'Login Page'

router.get('/', (req, res, next) => utils.error.handleHttpError(req, res, next, () => {
    return res.render('pages/login', { ...req.ctx, title: loginTitle });
}));

export default router;