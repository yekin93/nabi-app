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
exports.ActivationService = void 0;
const ActivationRepo_1 = require("../repositories/ActivationRepo");
const uuid_1 = require("uuid");
const UserRepository_1 = require("../repositories/UserRepository");
const mysql2_1 = require("../db/mysql2");
class ActivationService {
    static createActivation(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            const token = (0, uuid_1.v4)();
            const conn = yield (0, mysql2_1.getConnection)();
            try {
                yield ActivationRepo_1.ActivationRepo.createActivation(conn, userId, token);
                (0, mysql2_1.closeConnection)(conn, true);
            }
            catch (err) {
                (0, mysql2_1.closeConnection)(conn, false);
                throw err;
            }
        });
    }
    static activateUser(token) {
        return __awaiter(this, void 0, void 0, function* () {
            const conn = yield (0, mysql2_1.getConnection)();
            try {
                const activation = yield ActivationRepo_1.ActivationRepo.getActivationByToken(conn, token);
                yield UserRepository_1.UserRepo.activateUserById(conn, activation.getUserId);
                (0, mysql2_1.closeConnection)(conn, true);
            }
            catch (err) {
                (0, mysql2_1.closeConnection)(conn, false);
                throw err;
            }
        });
    }
}
exports.ActivationService = ActivationService;
