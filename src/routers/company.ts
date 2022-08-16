import { Router } from "express";
import { CompanyController } from "../controllers/company";
import { auth } from "../middleware/auth";
import multer, { Multer } from 'multer';
import path from "path";
import { Express } from "express";
const router = Router();

const companyController: CompanyController = CompanyController.getInstance();

const storage = multer.diskStorage({
    destination: function(req, file, cb) {
        console.log();
        cb(null, path.join(__dirname, '../../', 'public','company'));
    },
    filename: function(req, file, cb){
        cb(null, file.filename);
    }
});
//dest:path.join(__dirname, '../../', 'public'
const upload: Multer = multer({storage});

router.post('/new-company', upload.single('avatar'), companyController.newCompany);
router.post('/activate-company', auth, companyController.activateCompanyById);

export default router;