import { ICompany } from "../interfaces/ICompany";

export class Company {
    private id: number;
    private name: string;
    private email: string;
    private isActive: number;
    private modifiedTime: Date;
    private createdTime: Date;


    constructor(id: number, name: string, email: string, isActive: number, modifiedTime: Date, createdTime: Date) {
        this.id = id;
        this.name = name;
        this.email = email;
        this.isActive = isActive;
        this.modifiedTime = modifiedTime;
        this.createdTime = createdTime;
    }

    public static sql(): string {
        return `company.id company_id, 
                company.name company_name, 
                company.email company_email, 
                company.is_active company_is_active, 
                company.modified_time company_modified_time, 
                company.created_time company_created_time`
    }

    public static row(row: ICompany): Company {
        return new Company(row.company_id, 
                            row.company_name,
                            row.company_email,
                            row.company_is_active,
                            row.company_modified_time,
                            row.company_created_time);
    }


    get getId(): number {
        return this.id;
    }
    set setId(id: number) {
        this.id = id;
    }

    get getName(): string {
        return this.name;
    }
    set setName(name: string) {
        this.name = name;
    }

    get getEmail(): string {
        return this.email;
    }
    set setEmail(email: string) {
        this.email = email;
    }

    get getIsActive(): number {
        return this.isActive;
    }
    set setIsActive(isActive: number) {
        this.isActive = isActive;
    }

    get  getModifiedTime(): Date {
        return this.modifiedTime;
    }
    set setModifiedTime(modifiedTime: Date) {
        this.modifiedTime = modifiedTime;
    }

    get getCreatedTime(): Date {
        return this.createdTime;
    }
    set setCreatedTime(createdTime: Date) {
        this.createdTime = createdTime;
    }
}