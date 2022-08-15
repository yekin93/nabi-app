"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.User = void 0;
class User {
    constructor(id, name, surname, email, isActive, isDeleted, modifiedTime, createdTime) {
        this.id = id;
        this.name = name;
        this.surname = surname;
        this.email = email;
        this.isActive = isActive;
        this.isDeleted = isDeleted;
        this.modifiedTime = modifiedTime;
        this.createdTime = createdTime;
    }
    static sql() {
        return "user.id user_id, "
            + "user.name user_name, "
            + "user.surname user_surname, "
            + "user.email user_email, "
            + "user.is_active user_is_active, "
            + "user.is_deleted user_is_deleted, "
            + "user.modified_time user_modified_time, "
            + "user.created_time user_created_time";
    }
    static row(row) {
        return new User(row.user_id, row.user_name, row.user_surname, row.user_email, row.user_is_active, row.user_is_deleted, row.user_modified_time, row.user_created_time);
    }
    get getId() {
        return this.id;
    }
    set setId(id) {
        this.id = id;
    }
    get getName() {
        return this.name;
    }
    set setName(name) {
        this.name = name;
    }
    get getSurname() {
        return this.surname;
    }
    set setSurname(surname) {
        this.surname = surname;
    }
    get getEmail() {
        return this.email;
    }
    set setEmail(email) {
        this.email = email;
    }
    get getIsActive() {
        return this.isActive;
    }
    set setIsActive(isActive) {
        this.isActive = isActive;
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
exports.User = User;
