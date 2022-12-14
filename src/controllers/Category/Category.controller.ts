import { NextFunction, Request, Response } from "express";
import { Category } from "../../models/Category";
import { CategoryService } from "../../services/Category/Category.service";
import log from '../../utils/logger';
export class CategoryController {


    private static instance: CategoryController;
    private categoryService: CategoryService;

    constructor() {
        this.categoryService = CategoryService.getInstance();
    }

    static getInstance(): CategoryController {
        if(!this.instance){
            this.instance = new CategoryController();
        }
        return this.instance;
    }

    insertCategory = async (req: Request, res: Response, next: NextFunction) => {
       const { categoryName } = req.body;
       log.info(`Category name is ${categoryName}`);
        await this.categoryService.insertCategory(categoryName);
        res.json({
            status: true
        });
    }

    getAllCategories = async (req: Request, res: Response, next: NextFunction) => {
        const categories: Category[] = await this.categoryService.getAllCategories();
        res.json({
            status: true,
            categories
        });
    }

}