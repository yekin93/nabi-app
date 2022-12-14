import { Router } from "express";
import { CategoryController } from "../controllers/Category/Category.controller";
import { auth } from "../middleware/auth";

const router = Router();

const categoryController: CategoryController = CategoryController.getInstance();

router.post('/insert', auth, categoryController.insertCategory);
router.get('/getAll', auth, categoryController.getAllCategories);
export default router;