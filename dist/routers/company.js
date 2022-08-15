"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const company_1 = require("../controllers/company");
const auth_1 = require("../middleware/auth");
const router = (0, express_1.Router)();
const companyController = company_1.CompanyController.getInstance();
router.post('/new-company', companyController.newCompany);
router.post('/activate-company', auth_1.auth, companyController.activateCompanyById);
exports.default = router;
