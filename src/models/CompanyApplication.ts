import { ICompanyApplication } from "../interfaces/ICompanyApplication";

export class CompanyApplication {
 
    private id: number;
    private firstName: string;
    private surname: string;
    private email: string;
    private telNumber: string;
    private country: string;
    private city: string;
    private postCode: string;
    private companyName: string;
    private categoryId: number;
    private salesCategoryId: number;
    private accepted: number;
    private modifiedDate: Date | null;
    private createdDate: Date | null;
    private isDeleted: number;


    constructor(id: number, firstName: string, surname: string, email: string, telNumber: string, country: string, city: string, postCode: string, companyName: string, categoryId: number, salesCategoryId: number,
        accepted: number, modifiedDate: Date | null, createdDate: Date | null, isDeleted: number){
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

        public static sql(): string {
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
                    company_application.acccepted company_application_accepted,
                    company_application.modified_date company_application_modified_date,
                    company_application.created_date company_application_created_date,
                    company_application.is_deleted company_application_is_deleted`;
        }

        public static row(row: ICompanyApplication): CompanyApplication {
            return new CompanyApplication(row.company_application_id,
                                            row.company_application_first_name,
                                            row.company_application_surname,
                                            row.company_application_email,
                                            row.company_application_tel_number,
                                            row.company_application_country,
                                            row.company_application_city,
                                            row.company_application_post_code,
                                            row.company_application_company_name,
                                            row.company_application_category_id,
                                            row.company_application_sales_category_id,
                                            row.company_application_accepted,
                                            row.company_application_modified_date,
                                            row.company_application_created_date,
                                            row.company_application_is_deleted);
        }


        get getId(): number {
            return this.id;
        }
        set setId(id: number) {
            this.id = id;
        }

        get getFirstName(): string {
            return this.firstName;
        }
        set setFirstName(firstName: string) {
            this.firstName = firstName;
        }

        get getSurname(): string {
            return this.surname;
        }
        set setSurname(surname: string) {
            this.surname = surname;
        }

        get getEmail(): string {
            return this.email;
        }
        set setEmail(email: string) {
            this.email = email;
        }

        get getTelNumber(): string {
            return this.telNumber;
        }
        set setTelNumber(telNumber: string) {
            this.telNumber = telNumber;
        }

        get getCountry(): string {
            return this.country;
        }
        set setCountry(country: string) {
            this.country = country;
        }

        get getCity(): string {
            return this.city;
        }
        set setCity(city: string) {
            this.city = city;
        }

        get getPostCode(): string {
            return this.postCode;
        }
        set setPostCode(postCode: string) {
            this.postCode = postCode;
        }

        get getCompanyName(): string {
            return this.companyName;
        }
        set setCompanyName(companyName: string) {
            this.companyName = companyName;
        }

        get getCategoryId(): number {
            return this.categoryId;
        }
        set setCategoryId(categoryId: number) {
            this.categoryId = categoryId;
        }

        get getSalesCategoyId(): number {
            return this.salesCategoryId;
        }
        set setSalesCategoryId(salesCategoryId: number) {
            this.salesCategoryId = salesCategoryId;
        }

        get getAccepted(): number {
            return this.accepted;
        }
        set setAccepted(accepted: number) {
            this.accepted = accepted;
        }

        get getModifiedDate(): Date | null{
            return this.modifiedDate;
        }
        set setModifiedDate(modifiedDate: Date | null) {
            this.modifiedDate = modifiedDate;
        }

        get getCreatedDate(): Date | null {
            return this.createdDate;
        }
        set setCreatedDate(createdDate: Date | null) {
            this.createdDate = createdDate;
        }

        get getIsDeleted(): number {
            return this.isDeleted;
        }
        set setIsDeleted(isDeleted: number) {
            this.isDeleted = isDeleted;
        }
}