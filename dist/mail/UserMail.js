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
exports.UserMail = void 0;
const sendMail_1 = require("../middleware/sendMail");
const path_1 = __importDefault(require("path"));
const ejs_1 = __importDefault(require("ejs"));
class UserMail {
    constructor() {
    }
    static getInstance() {
        if (!this.instance) {
            this.instance = new UserMail();
        }
        return this.instance;
    }
    userConfirmation(recipient, link) {
        return __awaiter(this, void 0, void 0, function* () {
            let template = yield ejs_1.default.renderFile(path_1.default.join(__dirname, '../../', 'mailcontents', 'user-confirmation.ejs'), { recipient, link });
            const options = {
                from: 'yekin_zulfikar@outlook.com',
                to: recipient.getEmail,
                subject: 'Confirmation',
                html: template
            };
            (0, sendMail_1.sendMail)(recipient.getEmail, options);
        });
    }
}
exports.UserMail = UserMail;
