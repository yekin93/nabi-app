"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.RolePermissionRepo = void 0;
const Permission_1 = require("../models/Permission");
class RolePermissionRepo {
    static getInstance() {
        if (!this.instance) {
            this.instance = new RolePermissionRepo();
        }
        return this.instance;
    }
    getPermissionsByUserId(conn, userId) {
        return __awaiter(this, void 0, void 0, function* () {
            const query = `SELECT ${Permission_1.Permission.sql()} FROM user_role 
                        LEFT JOIN role_permission ON user_role.role_id = role_permission.role_id 
                        LEFT JOIN permission ON role_permission.permission_id = permission.id 
                        WHERE user_role.user_id = ?`;
            const [rows] = yield conn.execute(query, [userId]);
            let permissions = null;
            rows.map((row) => {
                if (!permissions)
                    permissions = [];
                permissions.push(Permission_1.Permission.row(row));
            });
            return permissions;
        });
    }
}
exports.RolePermissionRepo = RolePermissionRepo;
