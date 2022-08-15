"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Session = void 0;
class Session {
    constructor(id, userId, token, rememberMe, isDeleted, createdTime) {
        this.id = id;
        this.userId = userId;
        this.token = token;
        this.rememberMe = rememberMe;
        this.isDeleted = isDeleted;
        this.createdTime = createdTime;
    }
    static sql() {
        return "session.id session_id, "
            + "session.user_id session_user_id, "
            + "session.token session_token, "
            + "session.remember_me session_remember_me, "
            + "session.is_deleted session_is_deleted, "
            + "session.created_time session_created_time";
    }
    static row(row) {
        return new Session(row.session_id, row.session_user_id, row.session_token, row.session_remember_me, row.session_is_deleted, row.session_created_time);
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
    get getRememberMe() {
        return this.rememberMe;
    }
    set setRememberMe(rememberMe) {
        this.rememberMe = rememberMe;
    }
    get getIsDeleted() {
        return this.isDeleted;
    }
    set setIsDeleted(isDeleted) {
        this.isDeleted = isDeleted;
    }
    get getCreatedTime() {
        return this.createdTime;
    }
    set setCreatedTime(createdTime) {
        this.createdTime = createdTime;
    }
    get getUser() {
        return this.user;
    }
    set setUser(user) {
        this.user = user;
    }
}
exports.Session = Session;
