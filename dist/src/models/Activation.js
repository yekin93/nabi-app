"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Activation = void 0;
class Activation {
    constructor(id, userId, token, createdTime) {
        this.id = id;
        this.userId = userId;
        this.token = token;
        this.createdTime = createdTime;
    }
    static sql() {
        return "activation.id activation_id, "
            + "activation.user_id activation_user_id, "
            + "activation.token activation_token, "
            + "activation.created_time activation_created_time";
    }
    static row(row) {
        return new Activation(row['activation_id'], row['activation_user_id'], row['activation_token'], row['activation_created_time']);
    }
    get getId() {
        return this.id;
    }
    set setId(id) {
        this.id = id;
    }
    get getUserId() {
        return this.userId;
    }
    set setUserId(userId) {
        this.userId = userId;
    }
    get getToken() {
        return this.token;
    }
    set setToken(token) {
        this.token = token;
    }
    get getCreatedTime() {
        return this.createdTime;
    }
    set setCreatedTime(createdTime) {
        this.createdTime = createdTime;
    }
}
exports.Activation = Activation;
