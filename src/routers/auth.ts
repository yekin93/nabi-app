import { Router } from "express";
import { AuthController } from "../controllers/auth";
import { auth } from "../middleware/auth";
const router = Router();

const authController: AuthController = AuthController.getInstance();

router.post('/signup', authController.signup);
router.get('/login', authController.login);
router.get('/logout', auth, authController.logout);



export default router;