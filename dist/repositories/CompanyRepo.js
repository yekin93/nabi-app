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
exports.CompanyRepo = void 0;
const Company_1 = require("../models/Company");
const logger_1 = __importDefault(require("../utils/logger"));
const CompanySession_1 = require("../models/CompanySession");
const CompanyApplication_1 = require("../models/CompanyApplication");
class CompanyRepo {
    static getInstance() {
        if (!this.instance) {
            this.instance = new CompanyRepo();
        }
        return this.instance;
    }
    newCompany(conn, company, password) {
        return __awaiter(this, void 0, void 0, function* () {
            const query = 'INSERT INTO company (category_id, name, email, password, modified_time, created_time) VALUES (?, ?, ?, PASSWORD2(?), NOW(), NOW())';
            const [ResultSetHeader] = yield conn.execute(query, [company.getCategoryId, company.getName, company.getEmail, password]);
            return ResultSetHeader.insertId;
        });
    }
    getById(conn, id) {
        return __awaiter(this, void 0, void 0, function* () {
            let company;
            const query = `SELECT 
                        ${Company_1.Company.sql()} 
                        ${Company_1.Company.from()}
                        WHERE company.id = ?`;
            const [rows] = yield conn.execute(query, [id]);
            rows.map(row => company = Company_1.Company.row(row));
            return company;
        });
    }
    activateCompanyById(conn, id) {
        return __awaiter(this, void 0, void 0, function* () {
            const query = `UPDATE company SET is_active = 1, modified_time = NOW() WHERE id = ?`;
            yield conn.execute(query, [id]);
        });
    }
    getCompanyAvatarIdByCompanyId(conn, companyId) {
        return __awaiter(this, void 0, void 0, function* () {
            return 1;
        });
    }
    insertCompanyAvatar(conn, companyId, fileName, fileExt) {
        return __awaiter(this, void 0, void 0, function* () {
            const query = `INSERT INTO company_avatar (company_id, filename, file_ext, modified_time, created_time) VALUES (?, ?, ?, NOW(), NOW())`;
            logger_1.default.info(`companyId: ${companyId} - fileName: ${fileName} - fileExt: ${fileExt}`);
            yield conn.execute(query, [companyId, fileName, fileExt]);
        });
    }
    updateCompanyAvatar(conn, companyId, fileName, fileExt) {
        return __awaiter(this, void 0, void 0, function* () {
        });
    }
    getCompanyByEmailAndPassword(conn, email, password) {
        return __awaiter(this, void 0, void 0, function* () {
            const query = `SELECT ${Company_1.Company.sql()} ${Company_1.Company.from()} WHERE email = ? AND password = PASSWORD2(?)`;
            const [rows] = yield conn.execute(query, [email, password]);
            let company = null;
            rows.map((row) => company = Company_1.Company.row(row));
            return company;
        });
    }
    insertCompanySession(conn, token, companyId) {
        return __awaiter(this, void 0, void 0, function* () {
            const query = `INSERT INTO company_session (company_id, token, created_time) VALUES (?, ?, NOW())`;
            yield conn.execute(query, [companyId, token]);
        });
    }
    removeSession(conn, token) {
        return __awaiter(this, void 0, void 0, function* () {
            yield conn.execute('UPDATE company_session SET is_deleted = 1 WHERE token = ?', [token]);
        });
    }
    getCompanyBySessionId(conn, token) {
        return __awaiter(this, void 0, void 0, function* () {
            const query = `SELECT ${CompanySession_1.CompanySession.sql()}, ${Company_1.Company.sql()} FROM company_session 
                        LEFT JOIN company ON company.id = company_session.company_id 
                        LEFT JOIN company_avatar ON company_avatar.company_id = company.id
                        WHERE company_session.token = ? AND company_session.is_deleted = 0`;
            const [rows] = yield conn.execute(query, [token]);
            let companySession = null;
            logger_1.default.info(`getCompanyBySessionId: sql: ${query} - rows.length = ${rows.length}`);
            rows.map(row => {
                logger_1.default.info(row.company_session_id);
                companySession = CompanySession_1.CompanySession.row(row);
                companySession.setCompany = Company_1.Company.row(row);
            });
            return companySession;
        });
    }
    companyApplication(conn, companyApplication) {
        return __awaiter(this, void 0, void 0, function* () {
            const query = `INSERT INTO company_application (first_name, surname, email, tel_number, country, city, post_code, company_name, category_id, sales_category_id, modified_date, created_date)
                        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, NOW(), NOW())`;
            console.log(companyApplication);
            yield conn.execute(query, [companyApplication.getFirstName,
                companyApplication.getSurname,
                companyApplication.getEmail,
                companyApplication.getTelNumber,
                companyApplication.getCountry,
                companyApplication.getCity,
                companyApplication.getPostCode,
                companyApplication.getCompanyName,
                companyApplication.getCategoryId,
                companyApplication.getSalesCategoyId
            ]);
        });
    }
    getNotAcceptedCompanyApplications(conn) {
        return __awaiter(this, void 0, void 0, function* () {
            const query = `SELECT ${CompanyApplication_1.CompanyApplication.sql()} FROM company_application WHERE company_application.is_deleted = 0 AND company_application.acccepted = 0`;
            const [rows] = yield conn.execute(query);
            const companyApplications = [];
            rows.map(row => companyApplications.push(CompanyApplication_1.CompanyApplication.row(row)));
            return companyApplications;
        });
    }
    getCompanyApplicationById(conn, id) {
        return __awaiter(this, void 0, void 0, function* () {
            const query = `SELECT ${CompanyApplication_1.CompanyApplication.sql()} FROM company_application WHERE company_application.id = ? AND is_deleted = 0`;
            const [rows] = yield conn.execute(query, [id]);
            let companyApplication = null;
            rows.map(row => companyApplication = CompanyApplication_1.CompanyApplication.row(row));
            return companyApplication;
        });
    }
    acceptCompanyApplicationById(conn, id) {
        return __awaiter(this, void 0, void 0, function* () {
            const query = `UPDATE company_application SET acccepted = 1, modified_date = NOW() WHERE id = ?`;
            conn.execute(query, [id]);
        });
    }
}
exports.CompanyRepo = CompanyRepo;
