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
exports.CompanyRepo = void 0;
const Company_1 = require("../models/Company");
class CompanyRepo {
    static getInstance() {
        if (!this.instance) {
            this.instance = new CompanyRepo();
        }
        return this.instance;
    }
    newCompany(conn, company, password) {
        return __awaiter(this, void 0, void 0, function* () {
            const query = 'INSERT INTO company (name, email, password, modified_time, created_time) VALUES (?, ?, PASSWORD2(?), NOW(), NOW())';
            const [ResultSetHeader] = yield conn.execute(query, [company.getName, company.getEmail, password]);
            return ResultSetHeader.insertId;
        });
    }
    getById(conn, id) {
        return __awaiter(this, void 0, void 0, function* () {
            let company;
            const query = `SELECT ${Company_1.Company.sql()} FROM company WHERE company.id = ?`;
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
}
exports.CompanyRepo = CompanyRepo;
