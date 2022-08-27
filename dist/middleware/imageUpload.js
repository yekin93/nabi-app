"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.companyAvatarUpload = void 0;
const multer_1 = __importDefault(require("multer"));
const path_1 = __importDefault(require("path"));
const uuid_1 = require("uuid");
const fileUtil_1 = require("../utils/fileUtil");
const imagesPath = path_1.default.join('C://', 'nabi-app', 'images');
const companyAvatarStorage = multer_1.default.diskStorage({
    destination: function (req, file, cb) {
        const companyFolder = path_1.default.join(imagesPath, 'company');
        console.log(file);
        cb(null, companyFolder);
    },
    filename: function (req, file, cb) {
        const fileName = `${(0, uuid_1.v4)()}.${(0, fileUtil_1.getFileExt)(file.originalname)}`;
        cb(null, fileName);
    }
});
exports.companyAvatarUpload = (0, multer_1.default)({ storage: companyAvatarStorage });
