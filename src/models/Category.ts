import { ICategory } from "../interfaces/ICategory";

export class Category {
 
    private id: number;
    private categroyName: string;
    private createdTime: Date;



    constructor(id: number, categoryName: string, createdTime: Date) {
        this.id = id;
        this.categroyName =  categoryName;
        this.createdTime = createdTime;
    }

    public static sql(): string {
        return `categories.id categories_id,
                categories.category_name categories_category_name,
                categories.created_time categories_created_time`;
    }

    public static row(row: ICategory): Category {
        return new Category(row.categories_id,
                            row.categories_category_name,
                            row.categories_created_time);
    }

    get getId(): number {
        return this.id;
    }
    set setId(id: number) {
        this.id = id;
    }

    get getCategoryName(): string {
        return this.categroyName;
    }
    set setCategoryName(categoryName: string) {
        this.categroyName = categoryName;
    }

    get getCreatedTime(): Date {
        return this.createdTime;
    }
    set setCreatedTime(createdTime: Date) {
        this.createdTime = createdTime;
    }
}