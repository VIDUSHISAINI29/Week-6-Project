import {Router} from 'express';

import authRoutes from './authRoutes.js';
import userRoutes from './userRoutes.js';
import jobRoutes from './jobRoutes.js';
import postRoutes from './postRoutes.js';
import messageRoutes from './messageRoutes.js';

const router = Router();

router.use('/auth', authRoutes);
router.use('/', userRoutes);
router.use('/', jobRoutes);
router.use('/', postRoutes);
router.use('/',messageRoutes);

export default router;