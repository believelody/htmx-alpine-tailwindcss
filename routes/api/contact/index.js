import express from 'express';

const router = express.Router();

router.post("/1", async (req, res, next) => {
  try {
    await new Promise(resolve => setTimeout(resolve, 3000));
    res.setHeader('HX-Trigger', 'signal');
    return res.render('partials/form/contact', {
      ...req.ctx,
      notify: { type: 'success', title: 'Contact', message: 'Nous avons bien reçu votre demande. Nous reviendrons vers vous dans les plus brefs délai.', }
    });
  } catch (error) {
    console.log(error);
    next(error);
  }
});

router.post("/2", async (req, res, next) => {
  try {
    await new Promise(resolve => setTimeout(resolve, 3000));
    return res.json({
      notify: { type: 'success', title: 'Contact', message: 'Nous avons bien reçu votre demande. Nous reviendrons vers vous dans les plus brefs délai.' }
    });
  } catch (error) {
    console.log(error);
    next(error);
  }
});

export default router;