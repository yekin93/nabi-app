import { Connection } from "mysql2/promise";
import { Category } from "../../models/Category";

export interface ICategoryRepo {
    insertCategory(conn: Connection, categoryName: string): Promise<void>;
    getAllCategories(conn: Connection): Promise<Category[]>;
}