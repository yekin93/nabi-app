import { IRole } from "../interfaces/IRole";

export class Role {

    private id: number;
    private creatorId: number;
    private roleName: string;
    private isDeleted: number;
    private modifiedTime: Date;
    private createdTime: Date;

    constructor(id: number, creatorId: number, roleName: string, isDeleted: number, modifiedTime: Date, createdTime: Date) {
        this.id = id;
        this.creatorId = creatorId;
        this.roleName = roleName;
        this.isDeleted = isDeleted;
        this.modifiedTime = modifiedTime;
        this.createdTime = createdTime;
    }

    public static sql(): string {
        return `role.id role_id, 
                role.creator_id role_creator_id, 
                role.role_name role_role_name, 
                role.is_deleted role_is_deleted, 
                role.modified_time role_modified_time, 
                role.created_time role_created_time`;
    }


    public static row(row: IRole): Role {
        return new Role(row.role_id,
                        row.role_creator_id,
                        row.role_role_name,
                        row.role_is_deleted,
                        row.role_modified_time,
                        row.role_created_time);
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
    set setCreatorId(creatorId: number) {
        this.creatorId = creatorId;
    }

    get getRoleName(): string {
        return this.roleName;
    }
    set setRoleName(roleName: string) {
        this.roleName = roleName;
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
    set setCreatedTime(createdTime: Date){
        this.createdTime = createdTime;
    }
}