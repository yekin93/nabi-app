import { RowDataPacket } from "mysql2";

export interface ICompany extends RowDataPacket {
    company_id: number;
    company_name: string;
    company_email: string;
    company_is_active: number;
    company_modified_time: Date;
    company_created_time: Date
}