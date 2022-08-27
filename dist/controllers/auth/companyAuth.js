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
exports.CompanyAuthController = void 0;
const companyService_1 = require("../../services/companyService");
const logger_1 = __importDefault(require("../../utils/logger"));
class CompanyAuthController {
    constructor() {
        this.login = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            try {
                const { email, password } = req.body;
                if (!email || !password) {
                    throw new Error("Please provide an email and password");
                }
                const companySession = yield this.companyServise.login(email, password);
                if (!companySession) {
                    res.status(500).json({
                        status: false,
                        message: 'User not found...'
                    });
                }
                const company = companySession != null ? companySession.getCompany : null;
                res.status(200).json({
                    status: true,
                    token: companySession === null || companySession === void 0 ? void 0 : companySession.getToken,
                    company
                });
            }
            catch (error) {
                return next(error);
            }
        });
        this.logout = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            try {
                const token = req.companySessionToken;
                const email = req.loggedinCompany ? req.loggedinCompany.getEmail : null;
                yield this.companyServise.logout(token);
                logger_1.default.info(`${email} is logout`);
                res.status(200).json({
                    status: true,
                    message: `${email} is logouted`
                });
            }
            catch (error) {
                return next(error);
            }
        });
        this.companyServise = companyService_1.CompanyService.getInstance();
    }
    static getInstance() {
        if (!this.instance) {
            this.instance = new CompanyAuthController();
        }
        return this.instance;
    }
}
exports.CompanyAuthController = CompanyAuthController;
