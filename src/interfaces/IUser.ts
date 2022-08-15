import { RowDataPacket } from "mysql2/promise";

export interface IUser extends RowDataPacket {
    user_id: number;
    user_name: string;
    user_surname: string;
    user_email: string;
    user_is_active: number;
    user_is_deleted: number;
    user_modified_time: Date;
    user_created_time: Date;
}