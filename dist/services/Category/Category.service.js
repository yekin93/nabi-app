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
exports.CategoryService = void 0;
const mysql2_1 = require("../../db/mysql2");
const CategoryRepo_1 = require("../../repositories/Category/CategoryRepo");
class CategoryService {
    constructor() {
        this.db = mysql2_1.MysqlDB.getInstance();
        this.categoryRepo = CategoryRepo_1.CategoryRepo.getInstance();
    }
    static getInstance() {
        if (!this.instance) {
            this.instance = new CategoryService();
        }
        return this.instance;
    }
    insertCategory(categoryName) {
        return __awaiter(this, void 0, void 0, function* () {
            let conn;
            try {
                conn = yield this.db.getConnection();
                yield this.categoryRepo.insertCategory(conn, categoryName);
                this.db.closeConnection(conn, true);
            }
            catch (err) {
                this.db.closeConnection(conn, false);
                throw err;
            }
        });
    }
    getAllCategories() {
        return __awaiter(this, void 0, void 0, function* () {
            let conn;
            try {
                conn = yield this.db.getConnection();
                const categories = yield this.categoryRepo.getAllCategories(conn);
                this.db.closeConnection(conn, true);
                return categories;
            }
            catch (err) {
                this.db.closeConnection(conn, false);
                throw err;
            }
        });
    }
}
exports.CategoryService = CategoryService;
