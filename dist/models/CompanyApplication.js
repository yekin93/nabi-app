"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CompanyApplication = void 0;
class CompanyApplication {
    constructor(id, firstName, surname, email, telNumber, country, city, postCode, companyName, categoryId, salesCategoryId, accepted, modifiedDate, createdDate, isDeleted) {
        this.id = id;
        this.firstName = firstName;
        this.surname = surname;
        this.email = email;
        this.telNumber = telNumber;
        this.country = country;
        this.city = city;
        this.postCode = postCode;
        this.companyName = companyName;
        this.categoryId = categoryId;
        this.salesCategoryId = salesCategoryId;
        this.accepted = accepted;
        this.modifiedDate = modifiedDate;
        this.createdDate = createdDate;
        this.isDeleted = isDeleted;
    }
    static sql() {
        return `company_application.id company_application_id,
                    company_application.first_name company_application_first_name,
                    company_application.surname company_application_surname,
                    company_application.email company_application_email,
                    company_application.tel_number company_application_tel_number,
                    company_application.country company_application_country,
                    company_application.city company_application_city,
                    company_application.post_code company_application_post_code,
                    company_application.company_name company_application_company_name,
                    company_application.category_id company_application_category_id,
                    company_application.sales_category_id company_application_sales_category_id,
                    company_application.accepted company_application_accepted,
                    company_application.modified_date company_application_modified_date,
                    company_application.created_date company_application_created_date,
                    company_application.is_deleted company_application_is_deleted`;
    }
    static row(row) {
        return new CompanyApplication(row.company_application_id, row.company_application_first_name, row.company_application_surname, row.company_application_email, row.company_application_tel_number, row.company_application_country, row.company_application_city, row.company_application_post_code, row.company_application_company_name, row.company_application_category_id, row.company_application_sales_category_id, row.company_application_accepted, row.company_application_modified_date, row.company_application_created_date, row.company_application_is_deleted);
    }
    get getId() {
        return this.id;
    }
    set setId(id) {
        this.id = id;
    }
    get getFirstName() {
        return this.firstName;
    }
    set setFirstName(firstName) {
        this.firstName = firstName;
    }
    get getSurname() {
        return this.surname;
    }
    set setSurname(surname) {
        this.surname = surname;
    }
    get getEmail() {
        return this.email;
    }
    set setEmail(email) {
        this.email = email;
    }
    get getTelNumber() {
        return this.telNumber;
    }
    set setTelNumber(telNumber) {
        this.telNumber = telNumber;
    }
    get getCountry() {
        return this.country;
    }
    set setCountry(country) {
        this.country = country;
    }
    get getCity() {
        return this.city;
    }
    set setCity(city) {
        this.city = city;
    }
    get getPostCode() {
        return this.postCode;
    }
    set setPostCode(postCode) {
        this.postCode = postCode;
    }
    get getCompanyName() {
        return this.companyName;
    }
    set setCompanyName(companyName) {
        this.companyName = companyName;
    }
    get getCategoryId() {
        return this.categoryId;
    }
    set setCategoryId(categoryId) {
        this.categoryId = categoryId;
    }
    get getSalesCategoyId() {
        return this.salesCategoryId;
    }
    set setSalesCategoryId(salesCategoryId) {
        this.salesCategoryId = salesCategoryId;
    }
    get getAccepted() {
        return this.accepted;
    }
    set setAccepted(accepted) {
        this.accepted = accepted;
    }
    get getModifiedDate() {
        return this.modifiedDate;
    }
    set setModifiedDate(modifiedDate) {
        this.modifiedDate = modifiedDate;
    }
    get getCreatedDate() {
        return this.createdDate;
    }
    set setCreatedDate(createdDate) {
        this.createdDate = createdDate;
    }
    get getIsDeleted() {
        return this.isDeleted;
    }
    set setIsDeleted(isDeleted) {
        this.isDeleted = isDeleted;
    }
}
exports.CompanyApplication = CompanyApplication;
