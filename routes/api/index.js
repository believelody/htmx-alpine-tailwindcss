import express from 'express';
import subscriptionApi from './subscription';

const router = express.Router();

router.use('/subscription', subscriptionApi);

export default router;