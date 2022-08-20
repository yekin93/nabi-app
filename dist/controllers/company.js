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
const companyService_1 = require("../services/companyService");
const logger_1 = __importDefault(require("../utils/logger"));
class CompanyController {
    constructor() {
        this.newCompany = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            try {
                const { name, email, password } = req.body;
                const file = req.file;
                console.log(req);
                const company = new Company_1.Company(0, name, email, 0, "", new Date(), new Date());
                const newCompany = yield this.companyService.newCompany(company, password, file);
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
