export class Activation {
    private id: number;
    private userId: number;
    private token: string;
    private createdTime: Date;
    
    constructor(id: number, userId: number, token: string, createdTime: Date) {
        this.id = id;
        this.userId = userId;
        this.token = token;
        this.createdTime = createdTime;
    }

    static sql(): string {
        return "activation.id activation_id, "
            + "activation.user_id activation_user_id, "
            + "activation.token activation_token, "
            + "activation.created_time activation_created_time"
    }

    static row(row: any): Activation {
        return new Activation(
            row['activation_id'],
            row['activation_user_id'],
            row['activation_token'],
            row['activation_created_time']
        );
    }

    get getId(): number {
        return this.id
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
        return this.token
    }
    set setToken(token: string) {
        this.token = token;
    }

    get getCreatedTime(): Date {
        return this.createdTime;
    }
    set setCreatedTime(createdTime: Date) {
        this.createdTime = createdTime;
    }
}