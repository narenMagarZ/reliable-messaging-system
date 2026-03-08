import dotenv from "dotenv";

dotenv.config();

export const configs = {
    port: Number(process.env["PORT"]),
    dbHost: process.env["DB_HOST"],
    dbPort: Number(process.env["DB_PORT"]),
    dbName: process.env["DB_NAME"]
}