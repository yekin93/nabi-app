"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CompanyController = void 0;
const Company_1 = require("../models/Company");
const CompanyApplication_1 = require("../models/CompanyApplication");
const companyService_1 = require("../services/companyService");
const logger_1 = __importDefault(require("../utils/logger"));
class CompanyController {
    constructor() {
        this.newCompany = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            try {
                const name = req.body.name;
                const email = req.body.email;
                const password = req.body.password;
                const categoryId = req.body.categoryId;
                const file = req.file;
                const company = new Company_1.Company(0, +categoryId, name, email, 0, "", new Date(), new Date());
                const newCompany = yield this.companyService.newCompany(company, password, file);
                if (newCompany && newCompany.getCompanyAvatar) {
                    newCompany.setCompanyAvatar = `${req.protocol}://${req.headers.host}/images/company/${newCompany.getCompanyAvatar}`;
                }
                logger_1.default.info(`new company is created: ${newCompany.getName} ${newCompany.getEmail}`);
                res.status(200).json({
                    status: true,
                    company: newCompany
                });
            }
            catch (err) {
                return next(err);
            }
        });
        this.activateCompanyById = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            try {
                const { companyId } = req.body;
                yield this.companyService.activateCompanyById(req.loggedinUser, companyId);
                logger_1.default.info(`companyId: ${companyId} is activated`);
                res.status(200).json({
                    status: true,
                    message: 'Company is activated'
                });
            }
            catch (err) {
                return next(err);
            }
        });
        this.companyApplication = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            try {
                logger_1.default.info('companyApplication request: ' + JSON.stringify(req.body));
                const { firstName, surname, email, telNumber, country, city, postCode, companyName, categoryId, salesCategoryId } = req.body;
                const companyApplication = new CompanyApplication_1.CompanyApplication(0, firstName, surname, email, telNumber, country, city, postCode, companyName, categoryId, salesCategoryId, 0, null, null, 0);
                yield this.companyService.companyApplication(companyApplication);
                res.status(200).json({
                    status: true,
                    message: 'Successfuly Company application'
                });
            }
            catch (err) {
                return next(err);
            }
        });
        this.getNotAcceptedCompanyApplications = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            try {
                const companyApplications = yield this.companyService.getNotAcceptedCompaynApplication();
                res.status(200).json({
                    status: true,
                    applications: companyApplications
                });
            }
            catch (err) {
                return next(err);
            }
        });
        this.getCompanyApplicationById = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            try {
                const { id } = req.body;
                const companyApplication = yield this.companyService.getCompanyApplicationById(id);
                res.status(200).json({
                    status: true,
                    companyApplication
                });
            }
            catch (err) {
                return next(err);
            }
        });
        this.companyService = companyService_1.CompanyService.getInstance();
    }
    static getInstance() {
        if (!this.instance) {
            this.instance = new CompanyController();
        }
        return this.instance;
    }
}
exports.CompanyController = CompanyController;
