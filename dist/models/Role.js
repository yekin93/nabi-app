"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Role = void 0;
class Role {
    constructor(id, creatorId, roleName, isDeleted, modifiedTime, createdTime) {
        this.id = id;
        this.creatorId = creatorId;
        this.roleName = roleName;
        this.isDeleted = isDeleted;
        this.modifiedTime = modifiedTime;
        this.createdTime = createdTime;
    }
    static sql() {
        return `role.id role_id, 
                role.creator_id role_creator_id, 
                role.role_name role_role_name, 
                role.is_deleted role_is_deleted, 
                role.modified_time role_modified_time, 
                role.created_time role_created_time`;
    }
    static row(row) {
        return new Role(row.role_id, row.role_creator_id, row.role_role_name, row.role_is_deleted, row.role_modified_time, row.role_created_time);
    }
    get getId() {
        return this.id;
    }
    set setId(id) {
        this.id = id;
    }
    get getCreatorId() {
        return this.creatorId;
    }
    set setCreatorId(creatorId) {
        this.creatorId = creatorId;
    }
    get getRoleName() {
        return this.roleName;
    }
    set setRoleName(roleName) {
        this.roleName = roleName;
    }
    get getIsDeleted() {
        return this.isDeleted;
    }
    set setIsDeleted(isDeleted) {
        this.isDeleted = isDeleted;
    }
    get getModifiedTime() {
        return this.modifiedTime;
    }
    set setModifiedTime(modifiedTime) {
        this.modifiedTime = modifiedTime;
    }
    get getCreatedTime() {
        return this.createdTime;
    }
    set setCreatedTime(createdTime) {
        this.createdTime = createdTime;
    }
}
exports.Role = Role;
