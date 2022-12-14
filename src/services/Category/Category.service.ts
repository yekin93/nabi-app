import { Connection } from "mysql2/promise";
import { MysqlDB } from "../../db/mysql2";
import { Category } from "../../models/Category";
import { CategoryRepo } from "../../repositories/Category/CategoryRepo";
import { ICategoryService } from "./ICategory.service";

export class CategoryService implements ICategoryService{

    private static instance: CategoryService;
    private db: MysqlDB;
    private categoryRepo: CategoryRepo;

    constructor() {
        this.db = MysqlDB.getInstance();
        this.categoryRepo = CategoryRepo.getInstance();
    }

    static getInstance(): CategoryService {
        if(!this.instance){
            this.instance = new CategoryService();
        }
        return this.instance;
    }

    async insertCategory(categoryName: string): Promise<void> {
        let conn!: Connection;
        try {
            conn = await this.db.getConnection();
            await this.categoryRepo.insertCategory(conn, categoryName);
            this.db.closeConnection(conn, true);
        } catch(err) {
            this.db.closeConnection(conn, false);
            throw err;
        }
    }

    async getAllCategories(): Promise<Category[]> {
        let conn!: Connection;
        try {
            conn = await this.db.getConnection();
            const categories: Category[] = await this.categoryRepo.getAllCategories(conn);
            this.db.closeConnection(conn, true);
            return categories;
        } catch(err) {
            this.db.closeConnection(conn, false);
            throw err;
        }
    }

}