"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const user_1 = __importDefault(require("./user"));
const auth_1 = __importDefault(require("./auth"));
const activation_1 = __importDefault(require("./activation"));
const router = (0, express_1.Router)();
router.use('/user', user_1.default);
router.use('/auth', auth_1.default);
router.use('/activation', activation_1.default);
exports.default = router;
