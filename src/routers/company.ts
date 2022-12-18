import { Router } from "express";
import { CompanyController } from "../controllers/company";
import { auth } from "../middleware/auth";
import { companyAvatarUpload } from "../middleware/imageUpload";
const router = Router();

const companyController: CompanyController = CompanyController.getInstance();

router.post('/new-company', companyAvatarUpload.single('avatar'), companyController.newCompany);
router.post('/activate-company', auth, companyController.activateCompanyById);
router.post('/company-application', companyController.companyApplication);
//router.post('/update-avatar', auth);
router.get('/not-accepted-applications', auth, companyController.getNotAcceptedCompanyApplications);
router.get('/getCompanyApplicationById', auth, companyController.getCompanyApplicationById);

export default router;