import { Router } from "express";
import { AuthController } from "../controllers/auth";
import { CompanyAuthController } from "../controllers/auth/companyAuth";
import { auth } from "../middleware/auth";
const router = Router();

const authController: AuthController = AuthController.getInstance();
const companyAuthController: CompanyAuthController = CompanyAuthController.getInstance();

router.get('/company-login', companyAuthController.login);
router.get('/company-logout', companyAuthController.logout);

router.post('/signup', authController.signup);
router.get('/login', authController.login);
router.get('/logout', auth, authController.logout);



export default router;