import { Connection } from "mysql2/promise";
import { Permission } from "../../models/Permission";

export interface IRolePermissionRepo {
    getPermissionsByUserId(conn: Connection, userId: number): Promise<Permission[] | null>;
}