"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const errorHandler_1 = require("./middleware/errorHandler");
const path_1 = __importDefault(require("path"));
const app = (0, express_1.default)();
const index_1 = __importDefault(require("./routers/index"));
app.use(express_1.default.urlencoded({
    extended: true
}));
//app.use(multer({dest: 'public'}).single('avatar'));
app.use(express_1.default.static(path_1.default.join(__dirname, '../', 'public')));
app.use('/api', index_1.default);
app.use((req, res, next) => {
    res.status(404).json({
        status: false,
        message: 'No Such a function'
    });
});
app.use(errorHandler_1.errorHandler);
app.listen(2015, () => {
    console.log('server is runing on 2015');
});
