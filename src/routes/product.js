import { Router } from 'express';
import ProductController from '../controllers/ProductController';

const router = new Router();

router.get('/', ProductController.index);
router.get('/filter', ProductController.filter);
router.get('/:id', ProductController.show);
router.post('/', ProductController.store);
router.put('/:id', ProductController.update);
router.delete('/:id', ProductController.delete);

export default router;
