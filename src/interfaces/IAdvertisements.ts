import { RowDataPacket } from "mysql2";

export interface IAdvertisements extends RowDataPacket {
    advertisements_id: number;
    advertisements_company_id: number;
    advertisements_description: string;
    advertisements_start_date: Date;
    advertisements_end_date: Date;
    advertisements_modified_time: Date;
    advertisements_created_time: Date;
}