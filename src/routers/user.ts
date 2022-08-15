import { Router } from "express";
import { auth } from "../middleware/auth";
import { UserController } from '../controllers/user';


const router = Router();

const userController: UserController = UserController.getInstance();

router.get('/', auth, userController.getAll);
router.get('/:id', auth, userController.getById);


export default router;