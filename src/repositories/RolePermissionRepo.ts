import { Connection } from "mysql2/promise";
import { IPermission } from "../interfaces/IPermission";
import { Permission } from "../models/Permission";
import { IRolePermissionRepo } from "./interface/IRolePermissionRepo";

export class RolePermissionRepo implements IRolePermissionRepo {

    private static instance: RolePermissionRepo;

    static getInstance(): RolePermissionRepo {
        if(!this.instance){
            this.instance = new RolePermissionRepo();
        }
        return this.instance;
    }

    async getPermissionsByUserId(conn: Connection, userId: number): Promise<Permission[] | null> {
        const query = `SELECT ${Permission.sql()} FROM user_role 
                        LEFT JOIN role_permission ON user_role.role_id = role_permission.role_id 
                        LEFT JOIN permission ON role_permission.permission_id = permission.id 
                        WHERE user_role.user_id = ?`;

        const [rows] = await conn.execute<IPermission[]>(query, [userId]);
        let permissions: Permission[] | null = null;

        rows.map((row: IPermission) => {
            if(!permissions) permissions = [];
            permissions.push(Permission.row(row));
        });

        return permissions;
    }

}