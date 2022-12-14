export interface ICategoryService {
    insertCategory(categoryName: string): Promise<void>;
}