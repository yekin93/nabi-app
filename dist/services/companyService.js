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
Object.defineProperty(exports, "__esModule", { value: true });
exports.CompanyService = void 0;
const mysql2_1 = require("../db/mysql2");
const CompanyRepo_1 = require("../repositories/CompanyRepo");
class CompanyService {
    constructor() {
        this.companyRepo = CompanyRepo_1.CompanyRepo.getInstance();
        this.db = mysql2_1.MysqlDB.getInstance();
    }
    static getInstance() {
        if (!this.instance) {
            this.instance = new CompanyService();
        }
        return this.instance;
    }
    newCompany(company, password) {
        return __awaiter(this, void 0, void 0, function* () {
            let conn;
            try {
                conn = yield this.db.getConnection();
                const companyId = yield this.companyRepo.newCompany(conn, company, password);
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
                yield this.companyRepo.activateCompanyById(conn, id);
                this.db.closeConnection(conn, true);
            }
            catch (err) {
                this.db.closeConnection(conn, false);
                throw err;
            }
        });
    }
}
exports.CompanyService = CompanyService;
