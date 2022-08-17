"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getFileExt = void 0;
const getFileExt = (fileName) => {
    const names = fileName ? fileName.split('.') : null;
    return names ? names[1] : null;
};
exports.getFileExt = getFileExt;
