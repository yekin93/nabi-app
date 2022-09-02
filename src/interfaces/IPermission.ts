import { RowDataPacket } from "mysql2";

export interface IPermission extends RowDataPacket {
    permission_id: number;
    permission_creator_id: number;
    permission_permission_name: string;
    permission_is_deleted: number;
    permission_modified_time: Date;
    permission_created_time: Date;
}