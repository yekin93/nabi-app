import { RowDataPacket } from "mysql2";

export interface ICompanySession extends RowDataPacket{
    company_session_id: number;
    company_session_user_id: number;
    company_session_token: string;
    company_session_remember_me: number;
    company_session_is_deleted: number;
    company_session_created_time: Date;
}