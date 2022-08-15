import { RowDataPacket } from "mysql2/promise";

export interface ISession extends RowDataPacket {
    session_id: number;
    session_user_id: number;
    session_token: string;
    session_remember_me: number;
    session_is_deleted: number;
    session_created_time: Date;
}