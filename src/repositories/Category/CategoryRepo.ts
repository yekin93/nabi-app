import { Connection } from "mysql2/promise";
import { ICategory } from "../../interfaces/ICategory";
import { Category } from "../../models/Category";
import { ICategoryRepo } from "./ICategoryRepo";

export class CategoryRepo implements ICategoryRepo {
    

    public static instance: CategoryRepo;

    static getInstance(): CategoryRepo {
        if(!this.instance) {
            this.instance = new CategoryRepo();
        }
        return this.instance;
    }

    async getAllCategories(conn: Connection): Promise<Category[]> {
        const categories: Category[] = [];
        const query = `SELECT ${Category.sql()} FROM categories`;
        const [rows] = await conn.execute<ICategory[]>(query);
        rows.map((row: ICategory) => categories.push(Category.row(row)));
        return categories;
    }

    async insertCategory(conn: Connection, categoryName: string): Promise<void> {
        const query = `INSERT INTO categories (category_name, created_time) VALUES (?, NOW())`;
        const [ResultSetHeader]: any = await conn.execute(query, [categoryName]);
    }
}