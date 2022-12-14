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
exports.CategoryController = void 0;
const Category_service_1 = require("../../services/Category/Category.service");
const logger_1 = __importDefault(require("../../utils/logger"));
class CategoryController {
    constructor() {
        this.insertCategory = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            const { categoryName } = req.body;
            logger_1.default.info(`Category name is ${categoryName}`);
            yield this.categoryService.insertCategory(categoryName);
            res.json({
                status: true
            });
        });
        this.getAllCategories = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            const categories = yield this.categoryService.getAllCategories();
            res.json({
                status: true,
                categories
            });
        });
        this.categoryService = Category_service_1.CategoryService.getInstance();
    }
    static getInstance() {
        if (!this.instance) {
            this.instance = new CategoryController();
        }
        return this.instance;
    }
}
exports.CategoryController = CategoryController;
