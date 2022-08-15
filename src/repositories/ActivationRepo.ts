import { Activation } from "../models/Activation";
import { Connection } from "mysql2/promise";

export class ActivationRepo {

    static async createActivation(conn: Connection, userId: number, token: string): Promise<void> {
        await conn.execute('INSERT INTO activation (user_id, token, created_time) VALUES (?, ?, NOW())', [userId, token]);
    }

    public static async getActivationByToken(conn:Connection, token: string): Promise<Activation>{
        let activation!: Activation;
        const [rows] = await conn.execute<any[]>(`SELECT ${Activation.sql()} FROM activation WHERE token = ?`, [token]);
        rows.map(row => {
            activation = Activation.row(row)
        });
        return activation;
    }
}