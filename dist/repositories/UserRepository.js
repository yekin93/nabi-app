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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserRepo = void 0;
const User_1 = require("../models/User");
const Session_1 = require("../models/Session");
const logger_1 = __importDefault(require("../utils/logger"));
logger_1.default.profile('User Respository');
class UserRepo {
    static getInstance() {
        if (!this.instance) {
            this.instance = new UserRepo();
        }
        return this.instance;
    }
    getAll(conn) {
        return __awaiter(this, void 0, void 0, function* () {
            const [rows] = yield conn.execute(`SELECT ${User_1.User.sql()} FROM user`);
            const user = [];
            rows.map((row) => user.push(User_1.User.row(row)));
            return user;
        });
    }
    getUserById(conn, id) {
        return __awaiter(this, void 0, void 0, function* () {
            let user;
            const [rows] = yield conn.execute(`SELECT ${User_1.User.sql()} FROM user WHERE user.id = ? AND user.is_deleted = 0`, [id]);
            rows.map((row) => user = User_1.User.row(row));
            return user;
        });
    }
    insertUser(conn, name, surname, email, password) {
        return __awaiter(this, void 0, void 0, function* () {
            const [ResultSetHeader] = yield conn.execute('INSERT INTO user(name, surname, email, password, modified_time, created_time) VALUES (?, ?, ?, PASSWORD2(?), NOW(), NOW())', [name, surname, email, password]);
            return ResultSetHeader['insertId'];
        });
    }
    activateUserById(conn, id) {
        return __awaiter(this, void 0, void 0, function* () {
            yield conn.execute('UPDATE user SET is_active = 1, modified_time = NOW() WHERE user.id = ?', [id]);
        });
    }
    getUserByEmailAndPassword(conn, email, password) {
        return __awaiter(this, void 0, void 0, function* () {
            let user;
            const query = `SELECT ${User_1.User.sql()} FROM user WHERE email = ? AND password = PASSWORD2(?) AND is_deleted = 0`;
            logger_1.default.info(`getUserByEmailAndPassword sql: ${query}`);
            const [rows] = yield conn.execute(query, [email, password]);
            rows.map((row) => {
                user = User_1.User.row(row);
            });
            return user;
        });
    }
    getSessionByToken(conn, token) {
        return __awaiter(this, void 0, void 0, function* () {
            let session = null;
            let user = null;
            let query = `SELECT ${Session_1.Session.sql()}, ${User_1.User.sql()} FROM session LEFT JOIN user ON session.user_id = user.id WHERE session.is_deleted = 0 AND session.token = ?`;
            logger_1.default.info('getSessionByToken sql:' + query);
            const [rows] = yield conn.execute(query, [token]);
            rows.map(row => {
                session = Session_1.Session.row(row);
                user = User_1.User.row(row);
                session.setUser = user;
            });
            return session;
        });
    }
    insertSession(conn, userId, token) {
        return __awaiter(this, void 0, void 0, function* () {
            yield conn.execute(`INSERT INTO session (user_id, token, created_time) VALUES (?, ?, NOW())`, [userId, token]);
        });
    }
    removeSession(conn, token) {
        return __awaiter(this, void 0, void 0, function* () {
            const query = 'UPDATE session SET is_deleted = 1 WHERE session.token = ?';
            yield conn.execute(query, [token]);
        });
    }
}
exports.UserRepo = UserRepo;
