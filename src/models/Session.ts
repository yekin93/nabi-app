import { ISession } from "../interfaces/ISession";
import { User } from "./User";

export class Session {
    private id: number;
    private userId: number;
    private token: string;
    private rememberMe: number;
    private isDeleted: number;
    private createdTime: Date;
    private user!: User

    constructor(id: number, userId: number, token: string, rememberMe: number, isDeleted: number, createdTime: Date){
        this.id = id;
        this.userId = userId;
        this.token = token;
        this.rememberMe = rememberMe;
        this.isDeleted = isDeleted;
        this.createdTime = createdTime;
    }

    public static sql(): string {
        return "session.id session_id, "
            + "session.user_id session_user_id, "
            + "session.token session_token, "
            + "session.remember_me session_remember_me, "
            + "session.is_deleted session_is_deleted, "
            + "session.created_time session_created_time"
    }

    public static row(row: ISession): Session {
        return new Session(row.session_id,
                            row.session_user_id,
                            row.session_token,
                            row.session_remember_me,
                            row.session_is_deleted,
                            row.session_created_time);
    }


    get getId(): number {
        return this.id;
    }
    set setId(id: number) {
        this.id = id;
    }

    get getUserId(): number {
        return this.userId;
    }
    set setUserId(userId: number) {
        this.userId = userId;
    }

    get getToken(): string {
        return this.token;
    }
    set setToken(token: string){
        this.token = token;
    }

    get getRememberMe(): number {
        return this.rememberMe;
    }
    set setRememberMe(rememberMe: number) {
        this.rememberMe = rememberMe;
    }

    get getIsDeleted(): number {
        return this.isDeleted;
    }
    set setIsDeleted(isDeleted: number) {
        this.isDeleted = isDeleted;
    }

    get getCreatedTime(): Date {
        return this.createdTime;
    }
    set setCreatedTime(createdTime: Date) {
        this.createdTime = createdTime;
    }

    get getUser(): User {
        return this.user;
    }
    set setUser(user: User) {
        this.user = user;
    }
}