"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const errorHandler_1 = require("./middleware/errorHandler");
const path_1 = __importDefault(require("path"));
const cors_1 = __importDefault(require("cors"));
const app = (0, express_1.default)();
const index_1 = __importDefault(require("./routers/index"));
const logger_1 = __importDefault(require("./utils/logger"));
app.use((0, cors_1.default)());
app.use(express_1.default.json());
app.use(express_1.default.static(path_1.default.join(__dirname, '../', 'public')));
app.use('/images', express_1.default.static(path_1.default.join('C://', 'nabi-app', 'images')));
app.use('/api', index_1.default);
app.use((req, res, next) => {
    logger_1.default.error('No Such a function: ', req);
    res.status(404).json({
        status: false,
        message: 'No Such a function'
    });
});
app.use(errorHandler_1.errorHandler);
app.listen(2015, () => {
    console.log('server is runing on 2015');
});
