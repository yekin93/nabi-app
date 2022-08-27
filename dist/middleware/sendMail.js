"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.sendMail = void 0;
const nodemailer_1 = __importDefault(require("nodemailer"));
const transporter = nodemailer_1.default.createTransport({
    service: 'hotmail',
    auth: {
        user: 'yekin_zulfikar@outlook.com',
        pass: '15121993@Ykn'
    }
});
const mailOptions = {
    from: 'yekin_zulfikar@outlook.com',
    to: 'gsyekings@gmail.com',
    subject: 'Test',
    html: '<h1>Hello world</h1>'
};
const sendMail = (recipient, mailOptions) => {
    transporter.sendMail(mailOptions, (err, data) => {
        if (err) {
            throw err;
        }
        console.log(data);
    });
};
exports.sendMail = sendMail;
