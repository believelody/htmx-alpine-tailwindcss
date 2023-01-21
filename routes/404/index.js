import express from 'express';
const router = express.Router();

router.get('/', (req, res) => {
  res.setHeader('HX-Push', '/404');
  return res.render("pages/404", { ...req.ctx, title: "404 Not Found" });
});

export default router;