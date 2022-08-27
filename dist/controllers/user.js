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
exports.UserController = void 0;
const UserService_1 = require("../services/UserService");
class UserController {
    constructor() {
        this.getAll = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            console.log("YKN:", req.hostname, req.headers, req.protocol);
            const users = yield this.userService.getAll();
            res.json({
                users
            });
        });
        this.getById = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            const id = +req.params.id;
            const user = yield this.userService.getUserById(id);
            res.json({
                user
            });
        });
        this.newUser = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            const { name, surname, email, password } = req.body;
            console.log(req.body);
            yield this.userService.insertUser(name, surname, email, password).then(user => {
                res.status(200).json({
                    status: true,
                    message: 'User successfuly inserted',
                    user
                });
            }).catch(err => {
                res.status(404).json({
                    status: false,
                    message: 'Opps! something went wrong...'
                });
            });
        });
        this.userService = UserService_1.UserService.getInstace();
    }
    static getInstance() {
        if (!this.instance) {
            this.instance = new UserController();
        }
        return this.instance;
    }
}
exports.UserController = UserController;
