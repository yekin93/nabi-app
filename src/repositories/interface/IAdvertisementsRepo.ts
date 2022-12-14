import { Connection } from "mysql2/promise";
import { Advertisements } from "../../models/Advertisements";

export interface IAdvertisementsRepo {
    newAdvertisement(conn: Connection, companyId: number, advertisement: Advertisements): Promise<number>;
}