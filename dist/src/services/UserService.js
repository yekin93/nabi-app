"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserService = void 0;
const UserRepository_1 = require("../repositories/UserRepository");
const mysql2_1 = require("../db/mysql2");
const uuid_1 = require("uuid");
const ActivationRepo_1 = require("../repositories/ActivationRepo");
class UserService {
    static getAll() {
        return __awaiter(this, void 0, void 0, function* () {
            const conn = yield (0, mysql2_1.getConnection)();
            try {
                let users = yield UserRepository_1.UserRepo.getAll(conn);
                (0, mysql2_1.closeConnection)(conn, true);
                return users;
            }
            catch (err) {
                (0, mysql2_1.closeConnection)(conn, false);
                throw err;
            }
        });
    }
    static getUserById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            let user;
            let conn;
            try {
                conn = yield (0, mysql2_1.getConnection)();
                user = yield UserRepository_1.UserRepo.getUserById(conn, id);
                (0, mysql2_1.closeConnection)(conn, true);
                return user;
            }
            catch (err) {
                (0, mysql2_1.closeConnection)(conn, false);
                throw err;
            }
        });
    }
    static insertUser(name, surname, email, password) {
        return __awaiter(this, void 0, void 0, function* () {
            let conn;
            try {
                conn = yield (0, mysql2_1.getConnection)();
                const token = (0, uuid_1.v4)();
                const insertedId = yield UserRepository_1.UserRepo.insertUser(conn, name, surname, email, password);
                const user = yield UserRepository_1.UserRepo.getUserById(conn, insertedId);
                yield ActivationRepo_1.ActivationRepo.createActivation(conn, user.getId, token);
                (0, mysql2_1.closeConnection)(conn, true);
                return user;
            }
            catch (err) {
                console.log(err);
                (0, mysql2_1.closeConnection)(conn, false);
                throw err;
            }
        });
    }
    static getUserBySession(token) {
        return __awaiter(this, void 0, void 0, function* () {
            let conn;
            try {
                conn = yield (0, mysql2_1.getConnection)();
                const session = yield UserRepository_1.UserRepo.getSessionByToken(conn, token);
                const user = session.getUser;
                (0, mysql2_1.closeConnection)(conn, true);
                return user;
            }
            catch (err) {
                (0, mysql2_1.closeConnection)(conn, false);
                throw err;
            }
        });
    }
    static login(email, password) {
        return __awaiter(this, void 0, void 0, function* () {
            let conn;
            try {
                conn = yield (0, mysql2_1.getConnection)();
                let token;
                const user = yield UserRepository_1.UserRepo.getUserByEmailAndPassword(conn, email, password);
                if (user) {
                    token = (0, uuid_1.v4)();
                    yield UserRepository_1.UserRepo.insertSession(conn, user.getId, token);
                }
                (0, mysql2_1.closeConnection)(conn, true);
                return token;
            }
            catch (err) {
                (0, mysql2_1.closeConnection)(conn, false);
                throw err;
            }
        });
    }
}
exports.UserService = UserService;
