import mysql from 'mysql2/promise';


export class MysqlDB {

    private static instance: MysqlDB;
    
    

    static getInstance(): MysqlDB {
        if(!this.instance){
            this.instance = new MysqlDB();
        }
        return this.instance;
    }

    getConnection = async (): Promise<mysql.Connection> => {
        const conn: mysql.Connection = await mysql.createConnection({
            host: 'localhost',
            user: 'root',
            password: 'root',
            database: 'nabi-app'
        });
        await conn.beginTransaction();
        return conn;
    }

    closeConnection = async(conn: mysql.Connection, success: boolean) => {
        success ? await conn.commit() : await conn.rollback();
        await conn.end();
    }

}