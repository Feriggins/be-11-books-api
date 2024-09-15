import { Router } from 'express';
import bookRoutes from './books';

const router: Router = Router();

router.use('/books', bookRoutes);

export default router;
