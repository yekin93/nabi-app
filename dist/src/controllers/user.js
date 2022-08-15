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
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserController = void 0;
const UserService_1 = require("../services/UserService");
class UserController {
}
exports.UserController = UserController;
_a = UserController;
UserController.getAll = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const users = yield UserService_1.UserService.getAll();
    res.json({
        users
    });
});
UserController.getById = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const id = +req.params.id;
    const user = yield UserService_1.UserService.getUserById(id);
    res.json({
        user
    });
});
UserController.newUser = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { name, surname, email, password } = req.body;
    console.log(req.body);
    yield UserService_1.UserService.insertUser(name, surname, email, password).then(user => {
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
