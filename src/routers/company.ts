import { Router } from "express";
import { CompanyController } from "../controllers/company";
import { auth } from "../middleware/auth";
import multer, { Multer } from 'multer';
import path from "path";
import { Express } from "express";
import { companyAvatarUpload } from "../middleware/imageUpload";
const router = Router();

const companyController: CompanyController = CompanyController.getInstance();

router.post('/new-company', companyAvatarUpload.single('avatar'), companyController.newCompany);
router.post('/activate-company', auth, companyController.activateCompanyById);
//router.post('/update-avatar', auth);

export default router;