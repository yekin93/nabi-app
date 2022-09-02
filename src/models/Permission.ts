import { IPermission } from "../interfaces/IPermission";

export class Permission {
    
    private id: number;
    private creatorId: number;
    private permissionName: string;
    private isDeleted: number;
    private modifiedTime: Date;
    private createdTime: Date;

    constructor(id: number, creatorId: number, permissionName: string, isDeleted: number, modifiedTime: Date, createdTime: Date) {
        this.id = id;
        this.creatorId = creatorId;
        this.permissionName = permissionName;
        this.isDeleted = isDeleted;
        this.modifiedTime = modifiedTime;
        this.createdTime = createdTime;
    }

    public static sql(): string {
        return `permission.id permission_id, 
                permission.creator_id permission_creator_id, 
                permission.permission_name permission_permission_name, 
                permission.is_deleted permission_is_deleted, 
                permission.modified_time permission_modified_time, 
                permission.created_time permission_created_time`;
    }

    public static row(row: IPermission): Permission {
        return new Permission(row.permission_id,
                            row.permission_creator_id,
                            row.permission_permission_name,
                            row.permission_is_deleted,
                            row.permission_modified_time,
                            row.permission_created_time);
    }

    get getId(): number {
        return this.id;
    }
    set setId(id: number) {
        this.id = id;
    }

    get getCreatorId(): number {
        return this.creatorId;
    }
    set setCreatorId(creatorId: number){
        this.creatorId = creatorId;
    }

    get getPermissionName(): string {
        return this.permissionName;
    }
    set setPermissionName(permissionName: string) {
        this.permissionName = permissionName;
    }

    get getIsDeleted(): number {
        return this.isDeleted;
    }
    set setIsDeleted(isDeleted: number) {
        this.isDeleted = isDeleted;
    }

    get getModifiedTime(): Date {
        return this.modifiedTime;
    }
    set setModifiedTime(modifiedTime: Date) {
        this.modifiedTime = modifiedTime;
    }

    get getCreatedTime(): Date {
        return this.createdTime;
    }
    set setCreatedTime(createdTime: Date) {
        this.createdTime = createdTime;
    }
}