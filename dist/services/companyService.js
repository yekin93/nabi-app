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
exports.CompanyService = void 0;
const mysql2_1 = require("../db/mysql2");
const CompanyRepo_1 = require("../repositories/CompanyRepo");
const logger_1 = __importDefault(require("../utils/logger"));
const fileUtil_1 = require("../utils/fileUtil");
const uuid_1 = require("uuid");
const CompanyMail_1 = require("../mail/CompanyMail");
class CompanyService {
    constructor() {
        this.companyRepo = CompanyRepo_1.CompanyRepo.getInstance();
        this.db = mysql2_1.MysqlDB.getInstance();
        this.companyMail = CompanyMail_1.CompanyMail.getInstance();
    }
    getNotAcceptedCompaynApplication() {
        return __awaiter(this, void 0, void 0, function* () {
            let conn;
            try {
                conn = yield this.db.getConnection();
                const companyApplications = yield this.companyRepo.getNotAcceptedCompanyApplications(conn);
                this.db.closeConnection(conn, true);
                return companyApplications;
            }
            catch (err) {
                this.db.closeConnection(conn, false);
                throw err;
            }
        });
    }
    static getInstance() {
        if (!this.instance) {
            this.instance = new CompanyService();
        }
        return this.instance;
    }
    newCompany(company, password, file) {
        return __awaiter(this, void 0, void 0, function* () {
            let conn;
            try {
                conn = yield this.db.getConnection();
                const companyId = yield this.companyRepo.newCompany(conn, company, password);
                if (file) {
                    const fileExt = (0, fileUtil_1.getFileExt)(file.originalname);
                    if (fileExt) {
                        yield this.companyRepo.insertCompanyAvatar(conn, companyId, file.filename, fileExt);
                    }
                }
                const newCompany = yield this.companyRepo.getById(conn, companyId);
                this.db.closeConnection(conn, true);
                return newCompany;
            }
            catch (err) {
                this.db.closeConnection(conn, false);
                throw err;
            }
        });
    }
    activateCompanyById(loggedinUser, id) {
        return __awaiter(this, void 0, void 0, function* () {
            let conn;
            try {
                conn = yield this.db.getConnection();
                const company = yield this.companyRepo.getById(conn, id);
                if (company.getIsActive == 1)
                    throw new Error('This company already activated');
                yield this.companyRepo.activateCompanyById(conn, company.getId);
                this.db.closeConnection(conn, true);
            }
            catch (err) {
                this.db.closeConnection(conn, false);
                throw err;
            }
        });
    }
    getCompanyBySessionId(token) {
        return __awaiter(this, void 0, void 0, function* () {
            let conn;
            try {
                conn = yield this.db.getConnection();
                const companySession = yield this.companyRepo.getCompanyBySessionId(conn, token);
                const company = companySession ? companySession.getCompany : null;
                this.db.closeConnection(conn, true);
                return company;
            }
            catch (err) {
                this.db.closeConnection(conn, false);
                throw err;
            }
        });
    }
    companyApplication(companyApplication) {
        return __awaiter(this, void 0, void 0, function* () {
            let conn;
            try {
                conn = yield this.db.getConnection();
                yield this.companyRepo.companyApplication(conn, companyApplication);
                logger_1.default.info('New company application is created...');
                yield this.companyMail.companyApplicationMail(companyApplication);
                this.db.closeConnection(conn, true);
            }
            catch (err) {
                this.db.closeConnection(conn, false);
                throw err;
            }
        });
    }
    login(email, password) {
        return __awaiter(this, void 0, void 0, function* () {
            let conn;
            try {
                conn = yield this.db.getConnection();
                let token = null;
                const company = yield this.companyRepo.getCompanyByEmailAndPassword(conn, email, password);
                if (company) {
                    if (company.getIsActive === 0)
                        throw new Error("Company is not active, Please activate...");
                    token = (0, uuid_1.v4)();
                    yield this.companyRepo.insertCompanySession(conn, token, company.getId);
                }
                const companySession = token ? yield this.companyRepo.getCompanyBySessionId(conn, token) : null;
                this.db.closeConnection(conn, true);
                return companySession;
            }
            catch (err) {
                this.db.closeConnection(conn, false);
                throw err;
            }
        });
    }
    logout(token) {
        return __awaiter(this, void 0, void 0, function* () {
            let conn;
            try {
                conn = yield this.db.getConnection();
                yield this.companyRepo.removeSession(conn, token);
                this.db.closeConnection(conn, true);
            }
            catch (err) {
                this.db.closeConnection(conn, false);
                throw err;
            }
        });
    }
    getCompanyApplicationById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            let conn;
            try {
                conn = yield this.db.getConnection();
                const companyApplication = yield this.companyRepo.getCompanyApplicationById(conn, id);
                this.db.closeConnection(conn, true);
                return companyApplication;
            }
            catch (err) {
                this.db.closeConnection(conn, false);
                throw err;
            }
        });
    }
}
exports.CompanyService = CompanyService;
