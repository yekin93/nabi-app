import { ICompany } from "../interfaces/ICompany";

export class Company {
    private id: number;
    private categoryId: number;
    private name: string;
    private email: string;
    private isActive: number;
    private companyAvatar: string;
    private modifiedTime: Date | null;
    private createdTime: Date | null;


    constructor(id: number, categoryId: number, name: string, email: string, isActive: number, companyAvatar: string, modifiedTime: Date | null, createdTime: Date | null) {
        this.id = id;
        this.categoryId = categoryId;
        this.name = name;
        this.email = email;
        this.isActive = isActive;
        this.companyAvatar = companyAvatar;
        this.modifiedTime = modifiedTime;
        this.createdTime = createdTime;
    }

    public static sql(): string {
        return `company.id company_id, 
                company.category_id company_category_id,
                company.name company_name, 
                company.email company_email, 
                company.is_active company_is_active,
                company_avatar.filename company_avatar_avatar, 
                company.modified_time company_modified_time, 
                company.created_time company_created_time`
    }

    public static from(): string {
        return 'FROM company LEFT JOIN company_avatar ON company.id = company_avatar.company_id';
    }

    public static row(row: ICompany): Company {
        return new Company(row.company_id, 
                            row.company_category_id,
                            row.company_name,
                            row.company_email,
                            row.company_is_active,
                            row.company_avatar_avatar,
                            row.company_modified_time,
                            row.company_created_time);
    }


    get getId(): number {
        return this.id;
    }
    set setId(id: number) {
        this.id = id;
    }

    get getCategoryId(): number {
        return this.categoryId;
    }
    set setCategoryId(categoryId: number) {
        this.categoryId = categoryId;
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

    get getCompanyAvatar(): string {
        return this.companyAvatar;
    }
    set setCompanyAvatar(avatar: string) {
        this.companyAvatar = avatar;
    }

    get getIsActive(): number {
        return this.isActive;
    }
    set setIsActive(isActive: number) {
        this.isActive = isActive;
    }

    get  getModifiedTime(): Date | null {
        return this.modifiedTime;
    }
    set setModifiedTime(modifiedTime: Date | null) {
        this.modifiedTime = modifiedTime;
    }

    get getCreatedTime(): Date | null {
        return this.createdTime;
    }
    set setCreatedTime(createdTime: Date) {
        this.createdTime = createdTime;
    }
}