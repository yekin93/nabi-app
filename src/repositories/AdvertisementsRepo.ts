import { Connection } from "mysql2/promise";
import { Advertisements } from "../models/Advertisements";
import { IAdvertisementsRepo } from "./interface/IAdvertisementsRepo";

export class AdvertisementsRepo implements IAdvertisementsRepo {

    private static instance: AdvertisementsRepo;
    
    static getInstance(): AdvertisementsRepo {
        if(!this.instance){
            this.instance = new AdvertisementsRepo();
        }
        return this.instance;
    }

    async newAdvertisement(conn: Connection, companyId: number, advertisement: Advertisements): Promise<number> {
        const query: string = `INSERT INTO (company_id, description, start_date, end_date, modified_time, created_time) VALUES (?, ?, ?, ?, NOW(), NOW())`;
        const [ResultSetHeader]: any = await conn.execute(query, [companyId, advertisement.getDescription, advertisement.getStartDate, advertisement.getEndDate]);
        return ResultSetHeader.insertId;
    }

}