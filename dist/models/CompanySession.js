"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CompanySession = void 0;
class CompanySession {
    constructor(id, companyId, token, rememberMe, isDeleted, createdTime) {
        this.id = id;
        this.companyId = companyId;
        this.token = token;
        this.rememberMe = rememberMe;
        this.isDeleted = isDeleted;
        this.createdTime = createdTime;
    }
    static sql() {
        return "company_session.id company_session_id, "
            + "company_session.company_id company_session_company_id, "
            + "company_session.token company_session_token, "
            + "company_session.remember_me company_session_remember_me, "
            + "company_session.is_deleted company_session_is_deleted, "
            + "company_session.created_time company_session_created_time";
    }
    static row(row) {
        return new CompanySession(row.company_session_id, row.company_session_user_id, row.company_session_token, row.company_session_remember_me, row.company_session_is_deleted, row.company_session_created_time);
    }
    get getId() {
        return this.id;
    }
    set setId(id) {
        this.id = id;
    }
    get getCompanyId() {
        return this.companyId;
    }
    set setCompanyId(companyId) {
        this.companyId = companyId;
    }
    get getToken() {
        return this.token;
    }
    set setToken(token) {
        this.token = token;
    }
    get getRememberMe() {
        return this.rememberMe;
    }
    set setRememberMe(rememberMe) {
        this.rememberMe = rememberMe;
    }
    get getIsDeleted() {
        return this.isDeleted;
    }
    set setIsDeleted(isDeleted) {
        this.isDeleted = isDeleted;
    }
    get getCreatedTime() {
        return this.createdTime;
    }
    set setCreatedTime(createdTime) {
        this.createdTime = createdTime;
    }
    get getCompany() {
        return this.company;
    }
    set setCompany(company) {
        this.company = company;
    }
}
exports.CompanySession = CompanySession;
