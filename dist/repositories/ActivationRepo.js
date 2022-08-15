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
exports.ActivationRepo = void 0;
const Activation_1 = require("../models/Activation");
class ActivationRepo {
    static createActivation(conn, userId, token) {
        return __awaiter(this, void 0, void 0, function* () {
            yield conn.execute('INSERT INTO activation (user_id, token, created_time) VALUES (?, ?, NOW())', [userId, token]);
        });
    }
    static getActivationByToken(conn, token) {
        return __awaiter(this, void 0, void 0, function* () {
            let activation;
            const [rows] = yield conn.execute(`SELECT ${Activation_1.Activation.sql()} FROM activation WHERE token = ?`, [token]);
            rows.map(row => {
                activation = Activation_1.Activation.row(row);
            });
            return activation;
        });
    }
}
exports.ActivationRepo = ActivationRepo;
