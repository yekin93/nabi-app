import { Router } from "express";
import userRouter from './user';
import authRouter from './auth';
import activationRouter from './activation';
import companyRouter from './company';
import categoryRouter from './category.router';
import log from '../utils/logger';

const router = Router();

router.use('/user', userRouter);
router.use('/auth', authRouter);
router.use('/activation', activationRouter);
router.use('/company', companyRouter)
router.use('/category', categoryRouter);

export default router;