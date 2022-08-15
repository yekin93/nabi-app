import { Router } from "express";
import { CompanyController } from "../controllers/company";
import { auth } from "../middleware/auth";
const router = Router();

const companyController: CompanyController = CompanyController.getInstance();

router.post('/new-company', companyController.newCompany);
router.post('/activate-company', auth, companyController.activateCompanyById);

export default router;