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
exports.CompanyMail = void 0;
const ejs_1 = __importDefault(require("ejs"));
const posix_1 = __importDefault(require("path/posix"));
const sendMail_1 = require("../middleware/sendMail");
const logger_1 = __importDefault(require("../utils/logger"));
class CompanyMail {
    constructor() {
    }
    static getInstance() {
        if (!this.instance) {
            this.instance = new CompanyMail();
        }
        return this.instance;
    }
    companyApplicationMail(application) {
        return __awaiter(this, void 0, void 0, function* () {
            logger_1.default.info(posix_1.default.join(__dirname, '../../', 'mailcontents'));
            const template = yield ejs_1.default.renderFile(posix_1.default.join(__dirname, '../', 'mailcontents', 'company-application.ejs'), { application });
            const options = {
                from: 'yekin_zulfikar@outlook.com',
                to: application.getEmail,
                subject: 'Company Application',
                html: template
            };
            (0, sendMail_1.sendMail)(application.getEmail, options);
        });
    }
}
exports.CompanyMail = CompanyMail;
