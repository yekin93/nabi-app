import { IAdvertisements } from "../interfaces/IAdvertisements";

export class Advertisements {
    private id: number;
    private companyId: number;
    private description: string;
    private startDate: Date;
    private endDate: Date;
    private modifiedTime: Date;
    private createdTime: Date;


    constructor(id: number, companyId: number, description: string, startDate: Date, endDate: Date, modifiedTime: Date, createdTime: Date) {
        this.id = id;
        this.companyId = companyId;
        this.description = description;
        this.startDate = startDate;
        this.endDate = endDate;
        this.modifiedTime = modifiedTime;
        this.createdTime = createdTime
    }

    public static sql(): string {
        return `advertisements.id advertisements_id,
                advertisements.company_id advertisements_company_id,
                advertisements.description advertisements_description, 
                advertisements.start_date advertisements_start_date, 
                advertisements.end_date advertisements_end_date, 
                advertisements.modified_time advertisements_modified_time,
                advertisements.created_time advertisements_created_time`;
    }

    public static row(row: IAdvertisements): Advertisements {
        return new Advertisements(row.advertisements_id,
                                    row.advertisements_company_id,
                                    row.advertisements_description,
                                    row.advertisements_start_date,
                                    row.advertisements_end_date,
                                    row.advertisements_modified_time,
                                    row.advertisements_created_time);
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

    get getDescription(): string {
        return this.description;
    }
    set setDescription(description: string) {
        this.description = description;
    }

    get getStartDate(): Date {
        return this.startDate;
    }
    set setStartDate(startDate: Date) {
        this.startDate = startDate;
    }

    get getEndDate(): Date {
        return this.endDate;
    }
    set setEndDate(endDate: Date) {
        this.endDate = endDate;
    }

    get getModifiedTime(): Date {
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