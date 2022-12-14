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
exports.CategoryRepo = void 0;
const Category_1 = require("../../models/Category");
class CategoryRepo {
    static getInstance() {
        if (!this.instance) {
            this.instance = new CategoryRepo();
        }
        return this.instance;
    }
    getAllCategories(conn) {
        return __awaiter(this, void 0, void 0, function* () {
            const categories = [];
            const query = `SELECT ${Category_1.Category.sql()} FROM categories`;
            const [rows] = yield conn.execute(query);
            rows.map((row) => categories.push(Category_1.Category.row(row)));
            return categories;
        });
    }
    insertCategory(conn, categoryName) {
        return __awaiter(this, void 0, void 0, function* () {
            const query = `INSERT INTO categories (category_name, created_time) VALUES (?, NOW())`;
            const [ResultSetHeader] = yield conn.execute(query, [categoryName]);
        });
    }
}
exports.CategoryRepo = CategoryRepo;
