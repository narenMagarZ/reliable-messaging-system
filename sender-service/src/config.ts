import dotenv from "dotenv";


const rootDirectoryPathSegments = __dirname.split("/sender-service");
const rootDirectoryPath = rootDirectoryPathSegments[0];

if (rootDirectoryPath) {
    dotenv.config({
        path: `${rootDirectoryPath}/.env`
    });
} else {
    console.error("Missing root directory path!");
    process.exit(1);
}

export const configs = {
    port: Number(process.env["PORT"]),
    dbHost: process.env["DB_HOST"],
    dbPort: process.env["DB_PORT"],
    dbName: process.env["DB_NAME"]
}