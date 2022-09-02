"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Permission = void 0;
class Permission {
    constructor(id, creatorId, permissionName, isDeleted, modifiedTime, createdTime) {
        this.id = id;
        this.creatorId = creatorId;
        this.permissionName = permissionName;
        this.isDeleted = isDeleted;
        this.modifiedTime = modifiedTime;
        this.createdTime = createdTime;
    }
    static sql() {
        return `permission.id permission_id, 
                permission.creator_id permission_creator_id, 
                permission.permission_name permission_permission_name, 
                permission.is_deleted permission_is_deleted, 
                permission.modified_time permission_modified_time, 
                permission.created_time permission_created_time`;
    }
    static row(row) {
        return new Permission(row.permission_id, row.permission_creator_id, row.permission_permission_name, row.permission_is_deleted, row.permission_modified_time, row.permission_created_time);
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
    get getPermissionName() {
        return this.permissionName;
    }
    set setPermissionName(permissionName) {
        this.permissionName = permissionName;
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
exports.Permission = Permission;
