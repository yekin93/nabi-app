"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Company = void 0;
class Company {
    constructor(id, categoryId, name, email, isActive, companyAvatar, modifiedTime, createdTime) {
        this.id = id;
        this.categoryId = categoryId;
        this.name = name;
        this.email = email;
        this.isActive = isActive;
        this.companyAvatar = companyAvatar;
        this.modifiedTime = modifiedTime;
        this.createdTime = createdTime;
    }
    static sql() {
        return `company.id company_id, 
                company.category_id company_category_id,
                company.name company_name, 
                company.email company_email, 
                company.is_active company_is_active,
                company_avatar.filename company_avatar_avatar, 
                company.modified_time company_modified_time, 
                company.created_time company_created_time`;
    }
    static from() {
        return 'FROM company LEFT JOIN company_avatar ON company.id = company_avatar.company_id';
    }
    static row(row) {
        return new Company(row.company_id, row.company_category_id, row.company_name, row.company_email, row.company_is_active, row.company_avatar_avatar, row.company_modified_time, row.company_created_time);
    }
    get getId() {
        return this.id;
    }
    set setId(id) {
        this.id = id;
    }
    get getCategoryId() {
        return this.categoryId;
    }
    set setCategoryId(categoryId) {
        this.categoryId = categoryId;
    }
    get getName() {
        return this.name;
    }
    set setName(name) {
        this.name = name;
    }
    get getEmail() {
        return this.email;
    }
    set setEmail(email) {
        this.email = email;
    }
    get getCompanyAvatar() {
        return this.companyAvatar;
    }
    set setCompanyAvatar(avatar) {
        this.companyAvatar = avatar;
    }
    get getIsActive() {
        return this.isActive;
    }
    set setIsActive(isActive) {
        this.isActive = isActive;
    }
    get getModifiedTime() {
        return this.modifiedTime;
    }
    set setModifiedTime(modifiedTime) {
        this.modifiedTime = modifiedTime;
    }
    get getCreatedTime() {
        return this.createdTime;
    }
    set setCreatedTime(createdTime) {
        this.createdTime = createdTime;
    }
}
exports.Company = Company;
