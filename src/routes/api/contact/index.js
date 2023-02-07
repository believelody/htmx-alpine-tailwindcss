import express from 'express';
import utils from '../../../utils';

const router = express.Router();

router.post("/1", (req, res, next) => utils.error.handleHttpError(req, res, next, async () => {
  await new Promise(resolve => setTimeout(resolve, 3000));
  res.setHeader('HX-Trigger', 'signal');
  return res.render('partials/form/contact', {
    ...req.ctx,
    notify: { type: 'success', title: 'Contact', message: 'Nous avons bien reçu votre demande. Nous reviendrons vers vous dans les plus brefs délai.', }
  });
}));

router.post("/2", (req, res, next) => utils.error.handleHttpError(req, res, next, async (req, res, next) => {
  await new Promise(resolve => setTimeout(resolve, 3000));
  return res.json({
    notify: { type: 'success', title: 'Contact', message: 'Nous avons bien reçu votre demande. Nous reviendrons vers vous dans les plus brefs délai.' }
  });
}));

export default router;