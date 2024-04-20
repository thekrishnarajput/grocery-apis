import { createPool, createConnection, Connection } from "mysql2/promise";
import { adminSchema } from "./admin/schemas/admin.schema";

const connect = async () => {
    try {
        const connection = await createConnection({
            host: "127.0.0.1",
            user: "root",
            password: "root",
            // database: "grocery_db"
        });
        let tableFlag = false;
        // Create database if not exists
        let dbCreate = JSON.parse(JSON.stringify(await connection.query('CREATE DATABASE IF NOT EXISTS grocery_db;')));

        if (dbCreate[0].warningStatus === 0) {

            console.log("Database created successfully!");
            // Create tables if not exists
            await createTables(connection);
        }
        else {
            // Create tables if not exists
            await createTables(connection);
            console.log("Database is already created!");
        }
        return connection;
    } catch (error) {
        console.error("Error connecting to database:", error);
        throw error;
    }
};

// Create tables if not exists function
const createTables = async (connection: Connection): Promise<void> => {
    // Switch to the grocery_db database
    await connection.query('USE grocery_db');

    // Create admin table if not exists
    await connection.query(adminSchema);
};

export default connect();