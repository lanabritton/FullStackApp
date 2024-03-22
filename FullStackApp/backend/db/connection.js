import mongoose from 'mongoose';
import config from './config.js';

const { uri } = config.db;

const connectToDb = async() => {
    try {
        await mongoose.connect(uri);
        console.log("Connected to DB");
    } catch (e) {
        console.log(`Failed to connect to db: ${e.message}`);
    }
};

export default connectToDb;