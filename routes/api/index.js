import express from 'express';
import subscriptionApi from './subscription';
import userApi from './user';

const router = express.Router();

router.use('/subscription', subscriptionApi);
router.use('/users', userApi);

export default router;