import { Router } from 'express';
import seedDatabase from '../data/seed';

const router = new Router();

router.post('/', seedDatabase);

export default router;
