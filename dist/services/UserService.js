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
exports.UserService = void 0;
const UserRepository_1 = require("../repositories/UserRepository");
const uuid_1 = require("uuid");
const ActivationRepo_1 = require("../repositories/ActivationRepo");
const logger_1 = __importDefault(require("../utils/logger"));
const mysql2_1 = require("../db/mysql2");
const UserMail_1 = require("../mail/UserMail");
class UserService {
    constructor() {
        this.db = mysql2_1.MysqlDB.getInstance();
        this.userRepo = UserRepository_1.UserRepo.getInstance();
        this.userMail = UserMail_1.UserMail.getInstance();
    }
    static getInstace() {
        if (!this.instance) {
            this.instance = new UserService();
        }
        return this.instance;
    }
    getAll() {
        return __awaiter(this, void 0, void 0, function* () {
            const conn = yield this.db.getConnection();
            try {
                let users = yield this.userRepo.getAll(conn);
                this.db.closeConnection(conn, true);
                return users;
            }
            catch (err) {
                this.db.closeConnection(conn, false);
                throw err;
            }
        });
    }
    getUserById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            let user;
            let conn;
            try {
                conn = yield this.db.getConnection();
                user = yield this.userRepo.getUserById(conn, id);
                this.db.closeConnection(conn, true);
                return user;
            }
            catch (err) {
                this.db.closeConnection(conn, false);
                throw err;
            }
        });
    }
    insertUser(name, surname, email, password) {
        return __awaiter(this, void 0, void 0, function* () {
            let conn;
            try {
                conn = yield this.db.getConnection();
                const token = (0, uuid_1.v4)();
                const insertedId = yield this.userRepo.insertUser(conn, name, surname, email, password);
                const user = yield this.userRepo.getUserById(conn, insertedId);
                yield ActivationRepo_1.ActivationRepo.createActivation(conn, user.getId, token);
                const link = `http://localhost:2015/api/activation/${token}`;
                yield this.userMail.userConfirmation(user, link);
                logger_1.default.info(`New user created ${user.getEmail}`);
                this.db.closeConnection(conn, true);
                return user;
            }
            catch (err) {
                this.db.closeConnection(conn, false);
                throw err;
            }
        });
    }
    getUserBySession(token) {
        return __awaiter(this, void 0, void 0, function* () {
            let conn;
            try {
                conn = yield this.db.getConnection();
                const session = yield this.userRepo.getSessionByToken(conn, token);
                const user = session ? session.getUser : null;
                this.db.closeConnection(conn, true);
                return user;
            }
            catch (err) {
                this.db.closeConnection(conn, false);
                throw err;
            }
        });
    }
    login(email, password) {
        return __awaiter(this, void 0, void 0, function* () {
            let conn;
            try {
                conn = yield this.db.getConnection();
                let token = null;
                const user = yield this.userRepo.getUserByEmailAndPassword(conn, email, password);
                if (user) {
                    if (user.getIsActive == 0)
                        throw new Error('User is not active, Please activate user!');
                    token = (0, uuid_1.v4)();
                    yield this.userRepo.insertSession(conn, user.getId, token);
                }
                const session = token ? yield this.userRepo.getSessionByToken(conn, token) : null;
                this.db.closeConnection(conn, true);
                return session;
            }
            catch (err) {
                this.db.closeConnection(conn, false);
                throw err;
            }
        });
    }
    logout(token) {
        return __awaiter(this, void 0, void 0, function* () {
            let conn;
            try {
                conn = yield this.db.getConnection();
                yield this.userRepo.removeSession(conn, token);
                this.db.closeConnection(conn, true);
            }
            catch (err) {
                this.db.closeConnection(conn, false);
                throw err;
            }
        });
    }
}
exports.UserService = UserService;
