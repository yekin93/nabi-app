"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Category = void 0;
class Category {
    constructor(id, categoryName, createdTime) {
        this.id = id;
        this.categroyName = categoryName;
        this.createdTime = createdTime;
    }
    static sql() {
        return `categories.id categories_id,
                categories.category_name categories_category_name,
                categories.created_time categories_created_time`;
    }
    static row(row) {
        return new Category(row.categories_id, row.categories_category_name, row.categories_created_time);
    }
    get getId() {
        return this.id;
    }
    set setId(id) {
        this.id = id;
    }
    get getCategoryName() {
        return this.categroyName;
    }
    set setCategoryName(categoryName) {
        this.categroyName = categoryName;
    }
    get getCreatedTime() {
        return this.createdTime;
    }
    set setCreatedTime(createdTime) {
        this.createdTime = createdTime;
    }
}
exports.Category = Category;
