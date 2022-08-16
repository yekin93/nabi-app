"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const company_1 = require("../controllers/company");
const auth_1 = require("../middleware/auth");
const multer_1 = __importDefault(require("multer"));
const path_1 = __importDefault(require("path"));
const router = (0, express_1.Router)();
const companyController = company_1.CompanyController.getInstance();
const storage = multer_1.default.diskStorage({
    destination: function (req, file, cb) {
        console.log();
        cb(null, path_1.default.join(__dirname, '../../', 'public', 'company'));
    },
    filename: function (req, file, cb) {
        cb(null, 'test');
    }
});
//dest:path.join(__dirname, '../../', 'public'
const upload = (0, multer_1.default)({ storage });
router.post('/new-company', upload.single('avatar'), companyController.newCompany);
router.post('/activate-company', auth_1.auth, companyController.activateCompanyById);
exports.default = router;
