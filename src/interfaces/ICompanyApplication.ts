import { RowDataPacket } from "mysql2";

export interface ICompanyApplication extends RowDataPacket {
    company_application_id: number;
    company_application_first_name: string;
    company_application_surname: string;
    company_application_email: string;
    company_application_tel_number: string;
    company_application_country: string;
    company_application_city: string;
    company_application_post_code: string;
    company_application_company_name: string;
    company_application_category_id: number;
    company_application_sales_category_id: number;
    company_application_accepted: number;
    company_application_modified_date: Date;
    company_application_created_date: Date;
    company_application_is_deleted: number;
}