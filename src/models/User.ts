import { IUser } from "../interfaces/IUser";

export class User {
    private id: number;
    private name: string;
    private surname: string;
    private email: string;
    private isActive: number;
    private isDeleted: number;
    private modifiedTime: Date;
    private createdTime: Date;
    
    constructor(id: number, name: string, surname: string, email: string, isActive: number, isDeleted: number, modifiedTime: Date, createdTime: Date) {
        this.id = id;
        this.name = name;
        this.surname = surname;
        this.email = email;
        this.isActive = isActive;
        this.isDeleted = isDeleted;
        this.modifiedTime = modifiedTime;
        this.createdTime = createdTime;
    }

    

    public static sql(): string {
        return "user.id user_id, "
            + "user.name user_name, "
            + "user.surname user_surname, "
            + "user.email user_email, "
            + "user.is_active user_is_active, "
            + "user.is_deleted user_is_deleted, "
            + "user.modified_time user_modified_time, "
            + "user.created_time user_created_time";
    }

    public static row(row: IUser): User {
        return new User(row.user_id,
                            row.user_name,
                            row.user_surname,
                            row.user_email,
                            row.user_is_active,
                            row.user_is_deleted,
                            row.user_modified_time,
                            row.user_created_time
                            );
    }

    get getId(): number {
        return this.id
    }
    set setId(id: number){
        this.id = id;
    }

    get getName(): string {
        return this.name;
    }
    set setName(name: string) {
        this.name = name;
    }

    get getSurname(): string {
        return this.surname;
    }
    set setSurname(surname: string){
        this.surname = surname;
    }

    get getEmail(): string {
        return this.email;
    }
    set setEmail(email: string) {
        this.email = email;
    }

    get getIsActive(): number {
        return this.isActive;
    }
    set setIsActive(isActive: number) {
        this.isActive = isActive;
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