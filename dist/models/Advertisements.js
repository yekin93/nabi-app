"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Advertisements = void 0;
class Advertisements {
    constructor(id, companyId, description, startDate, endDate, modifiedTime, createdTime) {
        this.id = id;
        this.companyId = companyId;
        this.description = description;
        this.startDate = startDate;
        this.endDate = endDate;
        this.modifiedTime = modifiedTime;
        this.createdTime = createdTime;
    }
    static sql() {
        return `advertisements.id advertisements_id,
                advertisements.company_id advertisements_company_id,
                advertisements.description advertisements_description, 
                advertisements.start_date advertisements_start_date, 
                advertisements.end_date advertisements_end_date, 
                advertisements.modified_time advertisements_modified_time,
                advertisements.created_time advertisements_created_time`;
    }
    static row(row) {
        return new Advertisements(row.advertisements_id, row.advertisements_company_id, row.advertisements_description, row.advertisements_start_date, row.advertisements_end_date, row.advertisements_modified_time, row.advertisements_created_time);
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
    get getDescription() {
        return this.description;
    }
    set setDescription(description) {
        this.description = description;
    }
    get getStartDate() {
        return this.startDate;
    }
    set setStartDate(startDate) {
        this.startDate = startDate;
    }
    get getEndDate() {
        return this.endDate;
    }
    set setEndDate(endDate) {
        this.endDate = endDate;
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
exports.Advertisements = Advertisements;
