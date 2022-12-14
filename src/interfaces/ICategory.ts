import { RowDataPacket } from "mysql2";

export interface ICategory extends RowDataPacket {

    categories_id: number;
    categories_category_name: string;
    categories_created_time: Date;
}