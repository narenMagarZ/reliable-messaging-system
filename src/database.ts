import mongoose from 'mongoose';

import { configs } from './config';


class Database {
    private static instance: Database;
    constructor() {}

    static getDatabase() {
        if (!this.instance) {
            this.instance = new Database();
        }
        return this.instance;
    }

    public async connect() {
        try {
            await mongoose.connect(`mongodb://${configs.dbHost}:${configs.dbPort}/${configs.dbName}`, { autoIndex: false, });
            console.log("mongodb connected successfully");
        } catch (error) {
            console.error("Failed to connect to mongodb");    
            throw error;        
        }
    }

}

export const db = Database.getDatabase();