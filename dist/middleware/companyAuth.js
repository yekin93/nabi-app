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
exports.companyAuth = void 0;
const companyService_1 = require("../services/companyService");
const compantService = companyService_1.CompanyService.getInstance();
const companyAuth = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const bearer = req.headers.authorization ? req.headers.authorization : '';
    const token = bearer.split(' ')[1];
    if (!token) {
        res.status(401).json({
            status: false,
            message: 'Please provide token'
        });
    }
    const company = yield compantService.getCompanyBySessionId(token);
    if (company) {
        req.loggedinCompany = company;
        req.sessionToken = token;
        next();
    }
    else {
        req.loggedinCompany = null;
        req.companySessionToken = null;
        res.status(401).json({
            status: false,
            message: 'Please login...'
        });
    }
});
exports.companyAuth = companyAuth;
