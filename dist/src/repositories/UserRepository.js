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
exports.UserRepo = void 0;
const User_1 = require("../models/User");
const Session_1 = require("../models/Session");
class UserRepo {
    static getAll(conn) {
        return __awaiter(this, void 0, void 0, function* () {
            const [rows] = yield conn.execute(`SELECT ${User_1.User.sql()} FROM user`);
            const user = [];
            rows.map((row) => user.push(User_1.User.row(row)));
            return user;
        });
    }
    static getUserById(conn, id) {
        return __awaiter(this, void 0, void 0, function* () {
            let user;
            const [rows] = yield conn.execute(`SELECT ${User_1.User.sql()} FROM user WHERE user.id = ? AND user.is_active = 0 AND user.is_deleted = 0`, [id]);
            rows.map((row) => user = User_1.User.row(row));
            return user;
        });
    }
    static insertUser(conn, name, surname, email, password) {
        return __awaiter(this, void 0, void 0, function* () {
            const [ResultSetHeader] = yield conn.execute('INSERT INTO user(name, surname, email, password, modified_time, created_time) VALUES (?, ?, ?, PASSWORD2(?), NOW(), NOW())', [name, surname, email, password]);
            return ResultSetHeader['insertId'];
        });
    }
    static activateUserById(conn, id) {
        return __awaiter(this, void 0, void 0, function* () {
            yield conn.execute('UPDATE user SET is_active = 1, modified_time = NOW() WHERE user.id = ?', [id]);
        });
    }
    static getUserByEmailAndPassword(conn, email, password) {
        return __awaiter(this, void 0, void 0, function* () {
            let user;
            const [rows] = yield conn.execute(`SELECT ${User_1.User.sql()} FROM user WHERE email = ? AND password = PASSWORD2(?) AND is_active = 1 AND is_deleted = 0`, [email, password]);
            rows.map((row) => {
                user = User_1.User.row(row);
            });
            return user;
        });
    }
    static getSessionByToken(conn, token) {
        return __awaiter(this, void 0, void 0, function* () {
            let session;
            let user;
            let query = `SELECT ${Session_1.Session.sql()}, ${User_1.User.sql()} FROM session LEFT JOIN user ON session.user_id = user.id WHERE session.is_deleted = 0 AND session.token = ?`;
            console.log(query);
            const [rows] = yield conn.execute(query, [token]);
            rows.map(row => {
                session = Session_1.Session.row(row);
                user = User_1.User.row(row);
                session.setUser = user;
            });
            return session;
        });
    }
    static insertSession(conn, userId, token) {
        return __awaiter(this, void 0, void 0, function* () {
            yield conn.execute(`INSERT INTO session (user_id, token, created_time) VALUES (?, ?, NOW())`, [userId, token]);
        });
    }
}
exports.UserRepo = UserRepo;
