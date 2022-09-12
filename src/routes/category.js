import { Router } from 'express';
import CategoryController from '../controllers/CategoryController';

const router = new Router();

router.get('/', CategoryController.index);
router.get('/:id', CategoryController.show);
router.post('/', CategoryController.store);
router.put('/:id', CategoryController.update);
router.delete('/:id', CategoryController.delete);

export default router;
