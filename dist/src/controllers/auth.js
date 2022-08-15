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
exports.AuthController = void 0;
const UserService_1 = require("../services/UserService");
class AuthController {
}
exports.AuthController = AuthController;
_a = AuthController;
AuthController.signup = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { name, surname, email, password } = req.body;
    const user = yield UserService_1.UserService.insertUser(name, surname, email, password);
    res.status(200).json({
        status: true,
        message: 'User successfuly created',
        user
    });
});
AuthController.login = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password } = req.body;
    const token = yield UserService_1.UserService.login(email, password);
    res.status(200).json({
        token
    });
});
