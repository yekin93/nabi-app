import { ICompanySession } from "../interfaces/ICompanySession";
import { Company } from "./Company";

export class CompanySession {
    private id: number;
    private companyId: number;
    private token:string;
    private rememberMe: number;
    private isDeleted: number;
    private createdTime: Date;
    private company!: Company;

    constructor(id: number, companyId: number, token: string, rememberMe: number, isDeleted: number, createdTime: Date){
        this.id = id;
        this.companyId = companyId;
        this.token = token;
        this.rememberMe = rememberMe;
        this.isDeleted = isDeleted;
        this.createdTime = createdTime;
    }


    public static sql(): string {
        return "company_session.id company_session_id, "
            + "company_session.company_id company_session_company_id, "
            + "company_session.token company_session_token, "
            + "company_session.remember_me company_session_remember_me, "
            + "company_session.is_deleted company_session_is_deleted, "
            + "company_session.created_time company_session_created_time"
    }

    public static row(row: ICompanySession): CompanySession {
        return new CompanySession(row.company_session_id,
                            row.company_session_user_id,
                            row.company_session_token,
                            row.company_session_remember_me,
                            row.company_session_is_deleted,
                            row.company_session_created_time);
    }


    get getId(): number {
        return this.id;
    }
    set setId(id: number) {
        this.id = id;
    }

    get getCompanyId(): number {
        return this.companyId;
    }
    set setCompanyId(companyId: number) {
        this.companyId = companyId;
    }

    get getToken(): string {
        return this.token;
    }
    set setToken(token: string){
        this.token = token;
    }

    get getRememberMe(): number {
        return this.rememberMe;
    }
    set setRememberMe(rememberMe: number) {
        this.rememberMe = rememberMe;
    }

    get getIsDeleted(): number {
        return this.isDeleted;
    }
    set setIsDeleted(isDeleted: number) {
        this.isDeleted = isDeleted;
    }

    get getCreatedTime(): Date {
        return this.createdTime;
    }
    set setCreatedTime(createdTime: Date) {
        this.createdTime = createdTime;
    }

    get getCompany(): Company {
        return this.company;
    }
    set setCompany(company: Company) {
        this.company = company;
    }
}