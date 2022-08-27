import { RowDataPacket } from "mysql2";

export interface IRole extends RowDataPacket {
    role_id: number;
    role_creator_id: number;
    role_role_name: string;
    role_is_deleted: number;
    role_modified_time: Date;
    role_created_time: Date;
}