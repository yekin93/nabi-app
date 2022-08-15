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
exports.AuthController = void 0;
const UserService_1 = require("../services/UserService");
const logger_1 = __importDefault(require("../utils/logger"));
class AuthController {
    constructor() {
        this.signup = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            try {
                const { name, surname, email, password } = req.body;
                const user = yield this.userService.insertUser(name, surname, email, password);
                res.status(200).json({
                    status: true,
                    message: 'User successfuly created',
                    user
                });
            }
            catch (err) {
                return next(err);
            }
        });
        this.login = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            try {
                const { email, password } = req.body;
                const token = yield this.userService.login(email, password);
                let user = null;
                if (token) {
                    user = yield this.userService.getUserBySession(token);
                    res.status(200).json({
                        status: true,
                        token,
                        user
                    });
                }
                else {
                    res.status(200).json({
                        status: true,
                        message: `Could not find user with ${email}`
                    });
                }
            }
            catch (err) {
                return next(err);
            }
        });
        this.logout = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            try {
                const token = req.sessionToken;
                if (!token) {
                    throw new Error('You already logout');
                }
                const email = req.loggedinUser.getEmail;
                yield this.userService.logout(token);
                logger_1.default.info(`${email} is logout`);
                res.status(200).json({
                    status: true,
                    message: `${email} is logouted`
                });
            }
            catch (err) {
                return next(err);
            }
        });
        this.userService = UserService_1.UserService.getInstace();
    }
    static getInstance() {
        if (!this.instance) {
            this.instance = new AuthController();
        }
        return this.instance;
    }
}
exports.AuthController = AuthController;
